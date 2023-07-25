package main

import (
	"database/sql"
)

type User struct {
	Email    string
	Username string
	Password string
}

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

	err := row.Scan(&u.Email, &u.Username, &u.Password)

	if err != nil {
		return nil, err
	}

	return &u, nil
}
