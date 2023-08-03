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

type FriendInvites struct {
	id       int
	username string
	email    string
}
