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
	sync.RWMutex
	rooms         map[string]map[*Client]bool
	emailToClient map[string]*Client
}

func NewWebSocketManager() *Manager {
	return &Manager{
		rooms:         make(map[string]map[*Client]bool),
		emailToClient: make(map[string]*Client),
	}
}

func (m *Manager) serveWS(w http.ResponseWriter, r *http.Request) {
	userEmail := r.URL.Query().Get("email")

	conn, err := websocketUpgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Could not upgrade connection", err)
	}

	// create a new client
	client := NewClient(conn, m)

	m.addClient(client, userEmail)

	// Start a go routine to read/write messages
	go client.readMessages()
	go client.writeMessages()
}

func (m *Manager) addClient(client *Client, clientEmail string) {
	m.Lock()
	defer m.Unlock()

	if _, ok := m.rooms[client.room]; !ok {
		m.rooms[client.room] = make(map[*Client]bool)

	}
	m.rooms[client.room][client] = true
	m.emailToClient[clientEmail] = client
}

func (m *Manager) removeClient(client *Client) {
	m.Lock()
	defer m.Unlock()

	if _, ok := m.rooms[client.room]; ok {
		delete(m.rooms[client.room], client)
	}
}
