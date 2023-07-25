package main

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type Payload struct {
	Email string `json:"email"`
	jwt.RegisteredClaims
}

func signJWT(email string, secretKey string) (string, error) {
	claims := &Payload{
		Email: email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			Issuer:    "prakharff13",
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString([]byte(secretKey))

	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func parseJWT(tokenString string, secretKey string) (*Payload, error) {
	var p Payload

	token, err := jwt.ParseWithClaims(tokenString, &p, func(token *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})

	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, errors.New("invalid token")
	}

	return &p, nil
}
