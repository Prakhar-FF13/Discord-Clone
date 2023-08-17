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

func (m *Manager) isOnline(mail string) error {
	friends, errFr := m.discord.FetchFriends(mail)

	if errFr != nil {
		return errFr
	}

	for _, fr := range *friends {
		if conn, ok := m.emailToClient[fr.email]; ok {
			jsonBytes, errJson := encodeToJSON(map[string]interface{}{
				"kind": "friend-online",
				"payload": map[string]interface{}{
					"email": mail, "isOnline": true,
				},
			})
			if errJson == nil {
				conn.egress <- jsonBytes
			}
		}
	}

	return nil
}

func (m *Manager) isOffline(mail string) error {
	friends, errFr := m.discord.FetchFriends(mail)

	if errFr != nil {
		return errFr
	}

	for _, fr := range *friends {

		if conn, ok := m.emailToClient[fr.email]; ok {
			jsonBytes, errJson := encodeToJSON(map[string]interface{}{
				"kind": "friend-offline",
				"payload": map[string]interface{}{
					"email": mail, "isOnline": false,
				},
			})
			if errJson == nil {
				conn.egress <- jsonBytes
			}
		}
	}

	return nil
}

func (m *Manager) sendChatMessage(chatMessage ChatMessage) {
	data := &map[string]any{
		"kind": "chat-message",
		"payload": &map[string]any{
			"roomId":    chatMessage.RoomId,
			"createdBy": chatMessage.CreatedBy,
			"email":     chatMessage.Email,
			"username":  chatMessage.Username,
			"date":      chatMessage.Date,
			"message":   chatMessage.Message,
		},
	}

	dataBytes, err := encodeToJSON(data)

	go m.discord.InsertAChatMessage(chatMessage)

	if err == nil {
		for conn, prs := range m.rooms[chatMessage.RoomId] {
			if prs {
				conn.egress <- dataBytes
			}
		}
	}
}

func (m *Manager) sendAllChatMessagesForARoom(roomId string) {
	messages, err := m.discord.FetchAllChatMessagesForARoom(roomId)

	if err != nil {
		return
	}

	payload := &map[string]any{
		"kind":    "room-messages",
		"payload": messages,
	}

	bytePayload, errJson := encodeToJSON(payload)

	if errJson != nil {
		return
	}

	for conn, ok := range m.rooms[roomId] {
		if ok {
			conn.egress <- bytePayload
		}
	}
}

func (m *Manager) sendAllJoinedRooms(mail string) {
	roomIds, errRoomIds := m.discord.FetchAllJoinedVideoRooms(mail)

	if errRoomIds != nil {
		return
	}

	payload := map[string]any{
		"kind":    "video-room-create",
		"payload": *roomIds,
	}

	jsonPayload, errbytes := encodeToJSON(payload)

	if errbytes != nil {
		return
	}

	m.emailToClient[mail].egress <- jsonPayload
}

func (m *Manager) newUserJoinedARoom(mail string, roomId string) {
	payload := map[string]any{
		"kind": "new-user-video-room",
		"payload": map[string]any{
			"mail": mail,
		},
	}

	paylodJson, err := encodeToJSON(payload)

	if err != nil {
		fmt.Println("Error notifying other users that a new user has joined the video room")
		return
	}

	for conn := range m.videoRooms[roomId].participants {
		conn.egress <- paylodJson
	}
}

func (m *Manager) userLeftVideoRoom(mail string, roomId string) {
	payload := map[string]any{
		"kind": "leave-video-room",
		"payload": map[string]any{
			"mail": mail,
		},
	}

	paylodJson, err := encodeToJSON(payload)

	if err != nil {
		fmt.Println("Error notifying other users that a user has left the video room")
		return
	}

	for conn := range m.videoRooms[roomId].participants {
		if conn.email != mail {
			conn.egress <- paylodJson
		}
	}
}
