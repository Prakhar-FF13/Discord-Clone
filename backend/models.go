package main

import (
	"database/sql"
)

type DiscordDB struct {
	DB *sql.DB
}

func (d *DiscordDB) InsertUser(email, username, password string) error {
	stmt := `INSERT INTO users (email, username, password) VALUES(?, ?, ?)`

	_, err := d.DB.Exec(stmt, email, username, password)

	if err != nil {
		return err
	}

	return nil
}

func (d *DiscordDB) FetchUser(email string) (*User, error) {
	stmt := `SELECT * FROM users where email = ?`

	row := d.DB.QueryRow(stmt, email)

	var u User

	err := row.Scan(&u.id, &u.Email, &u.Username, &u.Password)

	if err != nil {
		return nil, err
	}

	return &u, nil
}

func (d *DiscordDB) FetchAllUnacceptedInvitations(email string) (*[]Friend, error) {
	stmt := `SELECT id, username, email FROM users where email IN (
		SELECT sender from friendinvites where receiver = ? AND status = Unaccepted)`

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
