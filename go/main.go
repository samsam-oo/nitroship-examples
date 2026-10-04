package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
)

const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Go example</title>
  <link rel="stylesheet" href="/site.css">
</head>
<body>
  <main>
    <h1>Go example</h1>
    <p>This page is rendered by Go for each request.</p>
    <p>Server time (UTC): <time>%s</time></p>
    <p><a href="/api/hello">Read the JSON response</a></p>
  </main>
</body>
</html>
`

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /{$}", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.Header().Set("Cache-Control", "no-store")
		fmt.Fprintf(w, page, time.Now().UTC().Format(time.RFC3339Nano))
	})
	mux.HandleFunc("GET /api/hello", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Cache-Control", "no-store")
		json.NewEncoder(w).Encode(struct {
			Message    string `json:"message"`
			ServerTime string `json:"serverTime"`
		}{"Go example", time.Now().UTC().Format(time.RFC3339Nano)})
	})
	mux.Handle("GET /site.css", http.FileServer(http.Dir("public")))

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	address := "0.0.0.0:" + port
	log.Printf("Go example listening on %s", address)
	log.Fatal(http.ListenAndServe(address, mux))
}
