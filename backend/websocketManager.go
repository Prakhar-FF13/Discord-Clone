package main

import (
	"fmt"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

var (
	websocketUpgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
)

// Manager is like a room.
// It stores how many clients it is managing.
type Manager struct {
	clients ClientList
	sync.RWMutex
}

func NewWebSocketManager() *Manager {
	return &Manager{
		clients: make(ClientList),
	}
}

func (m *Manager) serveWS(w http.ResponseWriter, r *http.Request) {
	fmt.Println("New Connection")

	conn, err := websocketUpgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
	}

	// create a new client
	client := NewClient(conn, m)

	m.addClient(client)

	// Start a go routine to read and write message from/to client

}

func (m *Manager) addClient(client *Client) {
	m.Lock()
	defer m.Unlock()

	m.clients[client] = true
}

func (m *Manager) removeClient(client *Client) {
	m.Lock()
	defer m.Unlock()

	// if client present -> remove him.
	if _, ok := m.clients[client]; ok {
		client.conn.Close()
		delete(m.clients, client)
	}
}
