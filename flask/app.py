"""Flask's single-file quickstart, with a rendered page and JSON response."""
from datetime import datetime, timezone

from flask import Flask, jsonify, render_template

app = Flask(__name__, static_folder="public", static_url_path="")


@app.get("/")
def home():
    return render_template("index.html", served_at=datetime.now(timezone.utc).isoformat())


@app.get("/api/hello")
def hello():
    return jsonify(framework="flask", message="Hello from Flask Compute", served_at=datetime.now(timezone.utc).isoformat())
