package main

// post request to register, this info is available in request body
type RegisterRequestBody struct {
	Email    string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
}

// this repsonse is sent from the register controller.
type RegisterResponse struct {
	Msg   string
	Token string
}
