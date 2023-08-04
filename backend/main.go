package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gofor-little/env"
)

type application struct {
	discord          *DiscordDB
	secretKey        string
	websocketManager *Manager
}

func openDB(dsn string) (*sql.DB, error) {
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}

func main() {
	if err := env.Load("./.env"); err != nil {
		log.Fatal("Could not load environment file")
	}

	port := env.Get("PORT", "4000")
	user1 := env.Get("USER1", "")
	dbName := env.Get("DB", "discord")
	secretKey := env.Get("KEY", "your-key")

	db, err := openDB(fmt.Sprintf("%s:%s@/%s?parseTime=true", user1, user1, dbName))
	if err != nil {
		fmt.Println("Error connecting DB")
		log.Fatal(err)
	}

	defer db.Close()

	discord := &DiscordDB{DB: db}

	// Websocket
	websocketManager := NewWebSocketManager(discord)

	app := application{discord: discord, secretKey: secretKey, websocketManager: websocketManager}

	http.ListenAndServe(fmt.Sprintf(":%s", port), app.routes())
}
