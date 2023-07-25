package main

// post request to register, this info is available in request body
type UserJson struct {
	Email    string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
}

// this is used when sending token to the user.
type TokenResponse struct {
	Msg   string
	Token string
}
