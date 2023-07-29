package main

import (
	"log"

	"github.com/gorilla/websocket"
)

type ClientList map[*Client]bool

// connection to talk to this client and
// the manager with which this client is associated with.
type Client struct {
	conn    *websocket.Conn
	manager *Manager
}

func NewClient(conn *websocket.Conn, manager *Manager) *Client {
	return &Client{
		manager: manager,
		conn:    conn,
	}
}

type ClientMessage struct {
	kind    string
	payload map[string]string
}

func (c *Client) readMessage() {
	defer func() {
		c.manager.removeClient(c)
	}()
	for {
		var p ClientMessage
		err := c.conn.ReadJSON(&p)
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Fatal("Error reading messages")
			}
			break
		}

		log.Println(p)
	}
}

func (c *Client) writeMessages() {

}
