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

type ClientPayload struct {
	RoomId    string         `json:"roomId"`
	Message   string         `json:"message"`
	Date      string         `json:"date"`
	Label     string         `json:"roomLabel"`
	Mail      string         `json:"mail"`
	Offer     map[string]any `json:"offer"`
	Answer    map[string]any `json:"answer"`
	Candidate map[string]any `json:"candidate"`
}

type ClientMessage struct {
	Kind    string        `json:"kind"`
	Payload ClientPayload `json:"payload"`
}

type ChatMessage struct {
	CreatedBy int64  `db:"createdBy" json:"createdBy"`
	Email     string `db:"email" json:"email"`
	Username  string `db:"username" json:"username"`
	RoomId    string `db:"roomId" json:"roomId"`
	Message   string `db:"message" json:"message"`
	Date      string `db:"date" json:"date"`
}

type VideoRoom struct {
	CreatedBy string `db:"createdBy" json:"createdBy"`
	RoomId    string `db:"roomId" json:"roomId"`
	Label     string `db:"roomLabel" json:"roomLabel"`
}
