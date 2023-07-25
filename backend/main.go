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

	app := application{}

	tokenString, err := signJWT("abc@gmail.com", secretKey)
	if err != nil {
		fmt.Println(err)
		log.Fatal("Error creating token")
	}

	parsedToken, err := parseJWT(tokenString, secretKey)
	if err != nil {
		fmt.Println(err)
		log.Fatal("Error parsing token")
	}

	fmt.Println(parsedToken)

	http.ListenAndServe(fmt.Sprintf(":%s", port), app.routes())
}
