package main

import (
	"fmt"
	"net/http"

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

type Manager struct{}

func NewWebSocketManager() *Manager {
	return &Manager{}
}

func (m *Manager) serveWS(w http.ResponseWriter, r *http.Request) {
	fmt.Println("New Connection")

	conn, err := websocketUpgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
	}

	conn.Close()
}
