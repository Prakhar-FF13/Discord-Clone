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
	rooms map[string]map[*Client]bool
}

func NewWebSocketManager() *Manager {
	return &Manager{
		clients: make(ClientList),
		rooms:   make(map[string]map[*Client]bool),
	}
}

func (m *Manager) serveWS(w http.ResponseWriter, r *http.Request) {
	fmt.Println("New Connection")

	conn, err := websocketUpgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Could not upgrade connection", err)
	}

	// create a new client
	client := NewClient(conn, m)

	m.addClient(client)

	// Start a go routine to read/write messages
	go client.readMessages()
	go client.writeMessages()
}

func (m *Manager) addClient(client *Client) {
	m.Lock()
	defer m.Unlock()

	m.clients[client] = true
	m.rooms[client.roomNo][client] = true
}

func (m *Manager) removeClient(client *Client) {
	m.Lock()
	defer m.Unlock()

	// if client present -> remove him.
	if _, ok := m.clients[client]; ok {
		client.conn.Close()
		delete(m.clients, client)
	}

	delete(m.rooms[client.roomNo], client)
}
