package main

type MessageResponse struct {
	Message string
}
type User struct {
	id       int
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
