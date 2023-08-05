package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
)

func (app *application) register(w http.ResponseWriter, r *http.Request) {
	// decode the request body using json decoder.
	var body User
	decoder := json.NewDecoder(r.Body)
	decoder.Decode(&body)

	// hash the password
	hashedPass := hashAndSalt([]byte(body.Password))

	//try to insert user into DB
	err := app.discord.InsertUser(body.Email, body.Username, hashedPass)
	if err != nil {
		fmt.Println("Error inserting the user into Database.", err)
		InternalServerErrorResponse(w)
		return
	}

	// Create a JWT.
	tokenString, err := signJWT(body.Email, app.secretKey)
	if err != nil {
		fmt.Println("Error creating token", err)
		InternalServerErrorResponse(w)
		return
	}

	JsonResponseOK(w, User{Token: tokenString, Email: body.Email, Username: body.Username})
}

func (app *application) login(w http.ResponseWriter, r *http.Request) {
	// decode the request body using json decoder.
	var body User
	decoder := json.NewDecoder(r.Body)
	decoder.Decode(&body)

	// fetch User from database.
	user, err := app.discord.FetchUser(body.Email)
	if err != nil {
		if err == sql.ErrNoRows {
			// there were no rows, but otherwise no error occurred
			JsonResponseNotFound(w, MessageResponse{
				Message: "User not found",
			})
			return
		}

		fmt.Println(err)
		fmt.Println("Something went wrong fetching the user from database")
		InternalServerErrorResponse(w)
		return
	}

	// compare passwords.
	if !comparePasswords(user.Password, []byte(body.Password)) {
		JsonResponseOK(w, MessageResponse{Message: "Passwords do not match"})
		return
	}

	// All ok Create a JWT to send to user.
	tokenString, err := signJWT(body.Email, app.secretKey)
	if err != nil {
		fmt.Println("Error creating token", err)
		InternalServerErrorResponse(w)
		return
	}

	// send token
	JsonResponseOK(w, User{Token: tokenString, Email: user.Email, Username: user.Username})
}

func (app *application) getPendingInvitations(w http.ResponseWriter, r *http.Request) {
	var p map[string]string
	decoder := json.NewDecoder(r.Body)
	decoder.Decode(&p)

	mail, ok := p["mail"]
	if !ok {
		JsonBadRequest(w)
		return
	}

	targetInvitations, errFetch := app.discord.FetchAllUnacceptedInvitations(mail)

	if errFetch != nil {
		InternalServerErrorResponse(w)
		return
	}

	var x []map[string]interface{}
	for _, v := range *targetInvitations {
		x = append(x, map[string]interface{}{
			"id":       v.id,
			"username": v.username,
			"email":    v.email,
		})
	}

	JsonResponseOK(w, x)
}

func (app *application) inviteFriend(w http.ResponseWriter, r *http.Request) {
	var p map[string]string
	decoder := json.NewDecoder(r.Body)
	decoder.Decode(&p)

	targetMail, ok := p["mail"]
	if !ok {
		JsonBadRequest(w)
		return
	}

	user := r.Context().Value("user").(*Payload)
	if user == nil {
		InternalServerErrorResponse(w)
		return
	}

	if user.Email == targetMail {
		JsonBadRequest(w)
		return
	}

	invited, invError := app.discord.AlreadyInvited(user.Email, targetMail)

	if invError != nil {
		InternalServerErrorResponse(w)
		return
	}

	if invited {
		JsonResponseOK(w, MessageResponse{Message: "Invitation already send"})
		return
	}

	err := app.discord.AddInvitation(user.Email, targetMail)

	if err != nil {
		InternalServerErrorResponse(w)
		return
	}

	errWeb := app.websocketManager.sendPendingInvitations(targetMail)

	if errWeb != nil {
		fmt.Println(errWeb)
	}

	JsonResponseOK(w, MessageResponse{Message: "Invite sent"})
}

func (app *application) fetchFriends(w http.ResponseWriter, r *http.Request) {
	var p map[string]string
	decoder := json.NewDecoder(r.Body)
	decoder.Decode(&p)

	mail, ok := p["mail"]
	if !ok {
		JsonBadRequest(w)
		return
	}

	friends, errFr := app.discord.FetchFriends(mail)

	if errFr != nil {
		InternalServerErrorResponse(w)
		return
	}

	var x []map[string]interface{}
	for _, v := range *friends {
		x = append(x, map[string]interface{}{
			"id":       v.id,
			"username": v.username,
			"email":    v.email,
		})
	}

	JsonResponseOK(w, x)
}

func (app *application) acceptFriendInvitation(w http.ResponseWriter, r *http.Request) {
	var p map[string]string
	decoder := json.NewDecoder(r.Body)
	decoder.Decode(&p)

	sender, ok := p["mail"]
	if !ok {
		JsonBadRequest(w)
		return
	}

	receiver := r.Context().Value("user").(*Payload)

	if receiver == nil {
		InternalServerErrorResponse(w)
		return
	}

	errReject := app.discord.AcceptInvitation(sender, receiver.Email)
	if errReject != nil {
		fmt.Println("Unable to Accept Invitation")
		InternalServerErrorResponse(w)
		return
	}
	errPendingInvites := app.websocketManager.sendPendingInvitations(receiver.Email)
	errFriends := app.websocketManager.sendFriends(receiver.Email)

	if errPendingInvites != nil || errFriends != nil {
		fmt.Println("Unable to Send Updated Invitation and Friends Data to user")
	}

	JsonResponseOK(w, MessageResponse{Message: "Invitation Accepted"})
}

func (app *application) rejectFriendInvitation(w http.ResponseWriter, r *http.Request) {
	var p map[string]string
	decoder := json.NewDecoder(r.Body)
	decoder.Decode(&p)

	sender, ok := p["mail"]
	if !ok {
		JsonBadRequest(w)
		return
	}

	receiver := r.Context().Value("user").(*Payload)

	if receiver == nil {
		InternalServerErrorResponse(w)
		return
	}

	errReject := app.discord.RejectInvitation(sender, receiver.Email)
	if errReject != nil {
		fmt.Println("Unable to Reject Invitation")
		InternalServerErrorResponse(w)
		return
	}
	errPendingInvites := app.websocketManager.sendPendingInvitations(receiver.Email)
	errFriends := app.websocketManager.sendFriends(receiver.Email)

	if errPendingInvites != nil || errFriends != nil {
		fmt.Println("Unable to Send Updated Invitation and Friends Data to user")
	}

	JsonResponseOK(w, MessageResponse{Message: "Invitation Rejected"})
}
