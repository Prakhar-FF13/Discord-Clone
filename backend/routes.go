package main

import (
	"context"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/rs/cors"
)

func (app *application) isAuthorized(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		reqToken := r.Header.Get("Authorization")

		if len(reqToken) == 0 {
			JsonResponseNotAuthorized(w)
			return
		}
		splitToken := strings.Split(reqToken, "Bearer ")
		if len(splitToken) != 2 {
			JsonResponseNotAuthorized(w)
			return
		}

		tokenString := splitToken[1]

		p, err := parseJWT(tokenString, app.secretKey)
		if err != nil {
			fmt.Println(err)
			InternalServerErrorResponse(w)
			return
		}

		if p.ExpiresAt.Before(time.Now()) {
			JsonResponseNotAuthorized(w)
			return
		}

		ctx := context.WithValue(r.Context(), "user", p)
		newReq := r.WithContext(ctx)

		next(w, newReq)
	}
}

func (app *application) routes() chi.Router {
	r := chi.NewRouter()
	// Basic CORS
	cors := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"X-PINGOTHER", "Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	})
	r.Use(cors.Handler)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Get("/", app.isAuthorized(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Welcome"))
	}))

	r.Post("/register", app.register)

	r.Post("/login", app.login)

	r.Get("/fetch-friends", app.isAuthorized(app.fetchFriends))

	r.Get("/friend-invitation/pending-invites", app.isAuthorized(app.getPendingInvitations))

	r.Post("/friend-invitation/invite", app.isAuthorized(app.inviteFriend))

	r.Post("/friend-invitation/accept", app.isAuthorized(app.acceptFriendInvitation))

	r.Post("/friend-invitation/reject", app.isAuthorized(app.rejectFriendInvitation))

	r.HandleFunc("/ws", app.websocketManager.serveWS)

	return r
}
