package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func (app *application) register(w http.ResponseWriter, r *http.Request) {
	// decode the request body using json decoder.
	var body RegisterRequestBody
	decoder := json.NewDecoder(r.Body)
	decoder.Decode(&body)

	// Create a JWT.
	tokenString, err := signJWT(body.Email, app.secretKey)
	if err != nil {
		fmt.Println(err)
		log.Fatal("Error creating token")
	}

	// send a json response back.
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(RegisterResponse{Msg: "Registered Successfully", Token: tokenString})
}

func (app *application) login(w http.ResponseWriter, r *http.Request) {

}
