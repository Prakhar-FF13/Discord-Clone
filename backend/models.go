package main

import (
	"database/sql"
)

type DiscordDB struct {
	DB *sql.DB
}

func (d *DiscordDB) InsertUser(email, username, password string) (int64, error) {
	stmt := `INSERT INTO users (email, username, password) VALUES(?, ?, ?)`

	res, err := d.DB.Exec(stmt, email, username, password)

	if err != nil {
		return -1, err
	}

	if id, errId := res.LastInsertId(); errId == nil {
		return id, nil
	}

	return -1, nil
}

func (d *DiscordDB) FetchUser(email string) (*User, error) {
	stmt := `SELECT * FROM users where email = ?`

	row := d.DB.QueryRow(stmt, email)

	var u User

	err := row.Scan(&u.Id, &u.Email, &u.Username, &u.Password)

	if err != nil {
		return nil, err
	}

	return &u, nil
}

func (d *DiscordDB) FetchAllUnacceptedInvitations(email string) (*[]Friend, error) {
	stmt := `SELECT id, username, email FROM users where email IN (
		SELECT sender from friendinvites where receiver = ? AND status = 'Unaccepted')`

	var invites []Friend

	rows, err := d.DB.Query(stmt, email)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		var invite Friend
		if err := rows.Scan(&invite.id, &invite.username, &invite.email); err != nil {
			return &invites, err
		}
		invites = append(invites, invite)
	}

	return &invites, nil
}

func (d *DiscordDB) AlreadyInvited(sender, receiver string) (bool, error) {
	stmt := `SELECT * FROM friendinvites where sender = ? and receiver = ?`

	row := d.DB.QueryRow(stmt, sender, receiver)

	type FriendRow struct {
		sender   string
		receiver string
		status   string
	}

	var i FriendRow

	err := row.Scan(&i.sender, &i.receiver, &i.status)

	if err == sql.ErrNoRows {
		return false, nil
	}

	if err != sql.ErrNoRows && err != nil {
		return true, err
	}

	if i.status != "Accepted" {
		return true, nil
	}

	return false, nil
}

func (d *DiscordDB) AddInvitation(sender string, target string) error {
	stmt := `INSERT INTO friendinvites (sender, receiver, status) VALUES(?, ?, ?)`

	_, err := d.DB.Exec(stmt, sender, target, "Unaccepted")

	if err != nil {
		return err
	}

	return nil
}

func (d *DiscordDB) FetchFriends(email string) (*[]Friend, error) {
	stmt := `SELECT id, username, email FROM users where
		email IN (SELECT sender as reqEmail from friendinvites where receiver = ? AND status = 'Accepted') OR 
		email IN (SELECT receiver as reqEmail from friendinvites where sender = ? AND status = 'Accepted');`

	var friends []Friend

	rows, err := d.DB.Query(stmt, email, email)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		var fr Friend
		if err := rows.Scan(&fr.id, &fr.username, &fr.email); err != nil {
			return &friends, err
		}
		friends = append(friends, fr)
	}

	return &friends, nil
}

func (d *DiscordDB) AcceptInvitation(sender, receiver string) error {
	stmt := `UPDATE friendinvites SET status = 'Accepted' where sender = ? AND receiver = ?;`

	_, err := d.DB.Exec(stmt, sender, receiver)

	if err != nil {
		return err
	}

	return nil
}

func (d *DiscordDB) RejectInvitation(sender, receiver string) error {
	stmt := `UPDATE friendinvites SET status = 'Rejected' where sender = ? AND receiver = ?;`

	_, err := d.DB.Exec(stmt, sender, receiver)

	if err != nil {
		return err
	}

	return nil
}

func (d *DiscordDB) FetchAllChatMessagesForARoom(roomId string) (*[]map[string]any, error) {
	stmt := `SELECT * FROM chatMessages WHERE roomId = ?`

	messages := make([]map[string]any, 0)

	rows, err := d.DB.Query(stmt, roomId)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		var x ChatMessage
		if err := rows.Scan(&x.RoomId, &x.CreatedBy, &x.Email, &x.Username, &x.Date, &x.Message); err != nil {
			return &messages, err
		}
		messages = append(messages, map[string]any{
			"roomId":    x.RoomId,
			"createdBy": x.CreatedBy,
			"email":     x.Email,
			"username":  x.Username,
			"date":      x.Date,
			"message":   x.Message,
		})
	}

	return &messages, nil
}

func (d *DiscordDB) InsertAChatMessage(cm ChatMessage) error {
	stmt := `INSERT INTO chatMessages VALUES(?, ?, ?, ?, ?, ?)`

	_, err := d.DB.Exec(stmt, cm.RoomId, cm.CreatedBy, cm.Email, cm.Username, cm.Date, cm.Message)

	if err != nil {
		return err
	}

	return nil
}
