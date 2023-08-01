package main

import (
	"log"

	"github.com/gorilla/websocket"
)

type ClientList map[*Client]bool

type ClientMessage struct {
	kind    string
	payload map[string]string
}

// connection to talk to this client and
// the manager with which this client is associated with.
type Client struct {
	conn    *websocket.Conn
	manager *Manager

	// egress -> used to avoid concurrent writes on websocket connection
	egress chan ClientMessage
	room   string
}

func NewClient(conn *websocket.Conn, manager *Manager) *Client {
	return &Client{
		manager: manager,
		conn:    conn,
		egress:  make(chan ClientMessage),
		room:    "",
	}
}

func (c *Client) readMessages() {
	defer func() {
		c.manager.removeClient(c)
	}()
	for {
		var p ClientMessage
		err := c.conn.ReadJSON(&p)
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Println("Error reading messages")
			}
			break
		}

		// logic to send messages to room here.
		log.Println(p)
	}
}

func (c *Client) writeMessages() {
	defer func() {
		c.manager.removeClient(c)
	}()
	for {
		select {
		case message, ok := <-c.egress:
			if !ok {
				if err := c.conn.WriteMessage(websocket.CloseMessage, nil); err != nil {
					log.Println("connection closed: ", err)
				}
			}
			if err := c.conn.WriteJSON(message); err != nil {
				log.Println("Failed to send message", err)
			}

			log.Println("Message sent")
		}
	}
}
