package main

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

type ClientList map[*Client]bool

// connection to talk to this client and
// the manager with which this client is associated with.
type Client struct {
	conn    *websocket.Conn
	manager *Manager

	// egress -> used to avoid concurrent writes on websocket connection
	egress    chan []byte
	room      string
	email     string
	username  string
	id        int64
	videoRoom string
}

func NewClient(conn *websocket.Conn, manager *Manager) *Client {
	return &Client{
		manager: manager,
		conn:    conn,
		egress:  make(chan []byte),
		room:    "",
		email:   "",
	}
}

func (c *Client) readMessages() {
	defer func() {
		c.manager.removeClient(c)
	}()
	for {
		_, p, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Println("Error reading messages")
			}
			break
		}

		var cm ClientMessage

		json.Unmarshal(p, &cm)

		if cm.Kind == "room-change" {
			if cm.Payload.RoomId != c.room {

				if _, ok := c.manager.rooms[c.room]; ok {
					delete(c.manager.rooms[c.room], c)
				}
				if _, ok := c.manager.rooms[cm.Payload.RoomId]; !ok {
					c.manager.rooms[cm.Payload.RoomId] = make(map[*Client]bool)
				}
				c.manager.rooms[cm.Payload.RoomId][c] = true
				c.room = cm.Payload.RoomId

				c.manager.sendAllChatMessagesForARoom(c.room)
			}
		} else if cm.Kind == "chat-message" {
			chatMessage := ChatMessage{
				Email:     c.email,
				Username:  c.username,
				RoomId:    c.room,
				Date:      cm.Payload.Date,
				Message:   cm.Payload.Message,
				CreatedBy: c.id,
			}
			c.manager.sendChatMessage(chatMessage)
		} else if cm.Kind == "video-room-create" {
			c.createVideoRoom(c.email, cm.Payload.Label)
		} else if cm.Kind == "video-room-join" {
			c.joinVideoRoom(cm.Payload.RoomId)
		} else if cm.Kind == "video-room-enter" {
			c.enterVideoRoom(cm.Payload.RoomId)
		} else if cm.Kind == "offer-video-room" {
			x := map[string]any{
				"kind": "offer-video-room",
				"payload": map[string]any{
					"mail":   cm.Payload.Mail,
					"offer":  cm.Payload.Offer,
					"sender": cm.Payload.Sender,
				},
			}

			c.redirectToMail(cm.Payload.Mail, x)
		} else if cm.Kind == "answer-video-room" {
			x := map[string]any{
				"kind": "answer-video-room",
				"payload": map[string]any{
					"mail":   cm.Payload.Mail,
					"answer": cm.Payload.Answer,
					"sender": cm.Payload.Sender,
				},
			}

			c.redirectToMail(cm.Payload.Mail, x)
		} else if cm.Kind == "new-ice-candidate" {
			x := map[string]any{
				"kind": "new-ice-candidate",
				"payload": map[string]any{
					"mail":      cm.Payload.Mail,
					"candidate": cm.Payload.Candidate,
					"sender":    cm.Payload.Sender,
				},
			}

			c.redirectToMail(cm.Payload.Mail, x)
		}
	}
}

func (c *Client) writeMessages() {
	defer func() {
		c.manager.removeClient(c)
	}()

	// populate initial data
	go c.manager.sendPendingInvitations(c.email)
	go c.manager.sendFriends(c.email)
	go c.manager.isOnline(c.email)
	go c.manager.sendAllJoinedRooms(c.email)

	for {
		select {
		case message, ok := <-c.egress:
			if !ok {
				if err := c.conn.WriteMessage(websocket.CloseMessage, nil); err != nil {
					log.Println("connection closed: ", err)
				}
			}

			if err := c.conn.WriteMessage(websocket.TextMessage, message); err != nil {
				log.Println("Failed to send message", err)
			}
		}
	}
}

func (c *Client) createVideoRoom(mail, label string) {
	err := c.manager.discord.CreateVideoRoom(mail, label)
	if err != nil {
		fmt.Println("Error creating new room")
	}

	c.manager.sendAllJoinedRooms(mail)
}

func (c *Client) joinVideoRoom(roomId string) {
	err := c.manager.discord.JoinVideoRoom(roomId, c.email)

	if err != nil {
		fmt.Println("Error joining the room")
	}

	c.manager.sendAllJoinedRooms(c.email)
}

func (c *Client) enterVideoRoom(roomId string) {
	if _, ok := c.manager.videoRooms[c.videoRoom]; ok {
		delete(c.manager.videoRooms[c.videoRoom].participants, c)
	}

	c.manager.newUserJoinedARoom(c.email, roomId)

	c.videoRoom = roomId
	if _, ok := c.manager.videoRooms[roomId]; !ok {
		c.manager.videoRooms[roomId] = VideoRoomOnline{createdBy: "", participants: make(map[*Client]bool)}
	}
	c.manager.videoRooms[roomId].participants[c] = true
}

func (c *Client) redirectToMail(mail string, payload map[string]any) {
	payloadJson, err := encodeToJSON(payload)

	if err != nil {
		fmt.Println("Could not redirect message to target email")
		return
	}

	c.manager.emailToClient[mail].egress <- payloadJson
}
