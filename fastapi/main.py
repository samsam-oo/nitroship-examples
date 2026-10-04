from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()


@app.get("/", response_class=HTMLResponse)
def home():
    served_at = datetime.now(timezone.utc).isoformat()
    return f"""<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>FastAPI on Nitroship</title><link rel="stylesheet" href="/example.css"></head>
<body><main><h1>FastAPI on Nitroship</h1><p>This page was rendered on Compute at <time>{served_at}</time>.</p><p>The stylesheet is a public build asset served from the CDN.</p><a href="/api/hello">Read the JSON response</a></main></body>
</html>"""


@app.get("/api/hello")
def hello():
    return {"framework": "fastapi", "message": "Hello from FastAPI Compute", "served_at": datetime.now(timezone.utc).isoformat()}


# Last, so local assets do not shadow application routes. Nitroship extracts
# this directory to the CDN; the mount also makes local development complete.
app.mount("/", StaticFiles(directory="public"), name="public")
