package main

import (
	"database/sql"
	"errors"
	"fmt"
)

func (app *application) sendPendingInvitations(targetMail string) error {
	targetInvitations, errFetch := app.discord.FetchAllUnacceptedInvitations(targetMail)

	var x []map[string]interface{}

	if errFetch != sql.ErrNoRows {
		for _, v := range *targetInvitations {
			x = append(x, map[string]interface{}{
				"id":       v.id,
				"username": v.username,
				"email":    v.email,
			})
		}
	}

	y := map[string]interface{}{
		"kind":    "friend-invitations",
		"payload": x,
	}

	fmt.Println(y)

	payload, errByte := encodeToJSON(y)

	if errFetch != nil || errByte != nil {
		return errors.New("could not send updated pending invitation list via websocket connection")
	}

	if _, ok := app.websocketManager.emailToClient[targetMail]; ok {
		app.websocketManager.emailToClient[targetMail].egress <- payload
	} else {
		return errors.New("could not get the connection details for the user with the email: " + targetMail)
	}

	return nil
}

func (app *application) sendFriends(mail string) error {
	friends, errFr := app.discord.FetchFriends(mail)

	if errFr != nil {
		return errFr
	}

	var x []map[string]interface{}
	for _, v := range *friends {
		x = append(x, map[string]interface{}{
			"id":       v.id,
			"username": v.username,
			"email":    v.email,
		})
	}

	y := map[string]interface{}{
		"kind":    "friends",
		"payload": x,
	}

	payload, errByte := encodeToJSON(y)

	if errByte != nil {
		return errors.New("could not send updated pending invitation list via websocket connection")
	}

	if _, ok := app.websocketManager.emailToClient[mail]; ok {
		app.websocketManager.emailToClient[mail].egress <- payload
	} else {
		return errors.New("could not get the connection details for the user with the email: " + mail)
	}

	return nil
}
