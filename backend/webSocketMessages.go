package main

import (
	"database/sql"
	"errors"
)

func (m *Manager) sendPendingInvitations(targetMail string) error {
	targetInvitations, errFetch := m.discord.FetchAllUnacceptedInvitations(targetMail)

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

	payload, errByte := encodeToJSON(y)

	if errFetch != nil || errByte != nil {
		return errors.New("could not send updated pending invitation list via websocket connection")
	}

	if _, ok := m.emailToClient[targetMail]; ok {
		m.emailToClient[targetMail].egress <- payload
	} else {
		return errors.New("could not get the connection details for the user with the email: " + targetMail)
	}

	return nil
}

func (m *Manager) sendFriends(mail string) error {
	friends, errFr := m.discord.FetchFriends(mail)

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

	if _, ok := m.emailToClient[mail]; ok {
		m.emailToClient[mail].egress <- payload
	} else {
		return errors.New("could not get the connection details for the user with the email: " + mail)
	}

	return nil
}
