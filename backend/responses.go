package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// converts a type to JSON
func encodeToJSON(obj interface{}) ([]byte, error) {
	return json.Marshal(obj)
}

func InternalServerErrorResponse(w http.ResponseWriter) {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusInternalServerError)
	x, _ := encodeToJSON(MessageResponse{Message: "Something went wrong with the server"})
	w.Write(x)
}

func JsonResponseOK(w http.ResponseWriter, obj interface{}) {

	// create json response to send back.
	jsonObj, err := encodeToJSON(obj)
	if err != nil {
		fmt.Println("Error creating json response", err)
		InternalServerErrorResponse(w)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonObj)
}

func JsonResponseNotFound(w http.ResponseWriter, obj interface{}) {
	// create json response to send back.
	jsonObj, err := encodeToJSON(obj)
	if err != nil {
		fmt.Println("Error creating json response", err)
		InternalServerErrorResponse(w)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusNotFound)
	w.Write(jsonObj)
}

func JsonResponseNotAuthorized(w http.ResponseWriter) {
	jsonObj, err := encodeToJSON(MessageResponse{Message: "Unauthorized! Please login to continue"})
	if err != nil {
		fmt.Println("Error creating json response", err)
		InternalServerErrorResponse(w)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusUnauthorized)
	w.Write(jsonObj)
}

func JsonBadRequest(w http.ResponseWriter) {
	jsonObj, err := encodeToJSON(MessageResponse{Message: "Bad Request! , Make sure all required data is provided"})
	if err != nil {
		fmt.Println("Error creating json response", err)
		InternalServerErrorResponse(w)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusBadRequest)
	w.Write(jsonObj)
}
