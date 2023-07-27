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
	x, _ := encodeToJSON(map[string]string{"msg": "Something went wrong with the server"})
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
