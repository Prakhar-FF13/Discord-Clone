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

	JsonResponseOK(w, User{Token: tokenString, Email: body.Username, Username: body.Username})
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
	JsonResponseOK(w, User{Token: tokenString, Email: user.Username, Username: user.Username})
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

	err := app.discord.AddInvitation(user.Email, targetMail)

	if err != nil {
		InternalServerErrorResponse(w)
		return
	}

	JsonResponseOK(w, MessageResponse{Message: "Invite sent"})
}
