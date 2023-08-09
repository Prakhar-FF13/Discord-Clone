package main

type MessageResponse struct {
	Message string
}
type User struct {
	Id       int64
	Email    string
	Username string
	Password string
	Token    string
}

type Friend struct {
	id       int
	username string
	email    string
}

type ClientMessage struct {
	Kind    string         `json:"kind"`
	Payload map[string]any `json:"payload"`
}
