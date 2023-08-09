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
	egress   chan []byte
	room     string
	email    string
	username string
	id       int64
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

		fmt.Println(cm)

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
			}
		} else if cm.Kind == "direct-chat-message" {
			c.manager.sendDirectChatMessage(c.id, c.email, c.username, cm.Payload.RoomId, cm.Payload.Date, cm.Payload.Message)
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
			log.Println("Message sent")

		}
	}
}
