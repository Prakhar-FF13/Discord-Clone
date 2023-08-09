package main

import (
	"fmt"
	"net/http"
	"strconv"
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
	discord       *DiscordDB
}

func NewWebSocketManager(d *DiscordDB) *Manager {
	return &Manager{
		rooms:         make(map[string]map[*Client]bool),
		emailToClient: make(map[string]*Client),
		discord:       d,
	}
}

func (m *Manager) serveWS(w http.ResponseWriter, r *http.Request) {
	userEmail := r.URL.Query().Get("email")
	userId, err := strconv.ParseInt(r.URL.Query().Get("id"), 10, 64)

	if err != nil {
		fmt.Println("User Id not provided, some functionality might not work")
	}

	fmt.Println("Client connected: ", userEmail)

	conn, err := websocketUpgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Could not upgrade connection", err)
	}

	// create a new client
	client := NewClient(conn, m)

	m.addClient(client, userEmail, userId)

	// Start a go routine to read/write messages
	go client.readMessages()
	go client.writeMessages()
}

func (m *Manager) addClient(client *Client, clientEmail string, clientId int64) {
	m.Lock()
	defer m.Unlock()

	client.email = clientEmail
	client.id = clientId

	if _, ok := m.rooms[client.room]; !ok {
		m.rooms[client.room] = make(map[*Client]bool)

	}
	m.rooms[client.room][client] = true
	m.emailToClient[clientEmail] = client

	m.isOnline(clientEmail)
}

func (m *Manager) removeClient(client *Client) {
	m.Lock()
	defer m.Unlock()

	if _, ok := m.rooms[client.room]; ok {
		delete(m.rooms[client.room], client)
		delete(m.emailToClient, client.email)

		m.isOffline(client.email)
	}
}
