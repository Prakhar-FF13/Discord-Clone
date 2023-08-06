package main

import (
	"database/sql"
	"errors"
	"fmt"
)

func (m *Manager) sendPendingInvitations(targetMail string) error {
	targetInvitations, errFetch := m.discord.FetchAllUnacceptedInvitations(targetMail)

	x := make([]map[string]interface{}, 0)

	if errFetch == nil {
		for _, v := range *targetInvitations {
			x = append(x, map[string]interface{}{
				"id":       v.id,
				"username": v.username,
				"email":    v.email,
			})
		}
	} else if errFetch != sql.ErrNoRows {
		return nil
	}

	fmt.Println(x)

	y := map[string]interface{}{
		"kind":    "friend-invitations",
		"payload": x,
	}

	payload, errByte := encodeToJSON(y)

	if errByte != nil {
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

	x := make([]map[string]interface{}, 0)

	if errFr == nil {
		for _, v := range *friends {
			isOnline := false
			if _, ok := m.emailToClient[v.email]; ok {
				isOnline = true
			}
			x = append(x, map[string]interface{}{
				"id":       v.id,
				"username": v.username,
				"email":    v.email,
				"isOnline": isOnline,
			})
		}
	} else if errFr != sql.ErrNoRows {
		return errFr
	}

	y := map[string]interface{}{
		"kind":    "friends",
		"payload": x,
	}

	payload, errByte := encodeToJSON(y)

	if errByte != nil {
		return errors.New("could not send updated friends list via websocket connection")
	}

	if _, ok := m.emailToClient[mail]; ok {
		m.emailToClient[mail].egress <- payload
	} else {
		return errors.New("could not get the connection details for the user with the email: " + mail)
	}

	return nil
}
