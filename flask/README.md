# Flask

A single-file app based on Flask's official quickstart. Nitroship auto-detects the `flask` container preset from `requirements.txt`: Gunicorn serves a Jinja-rendered page with the request time and `/api/hello` on Compute, while `public/example.css` is extracted to the CDN at `/example.css`. No Dockerfile or Nitroship-specific build configuration is needed.

## Run locally

From this directory, use Python 3.13 and pip with the fully pinned `requirements.txt`:

```sh
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
flask --app app run --host 0.0.0.0 --port 3000
```

Open `http://localhost:3000/`. The local Flask server also serves the public stylesheet; Nitroship serves it from the CDN. The app does not use sessions, a database, or required environment variables. The managed Gunicorn server binds `0.0.0.0:$PORT` (default `3000`); the development debugger is not enabled.

## Deploy and verify

From the repository root:

```sh
ntro deploy flask --app <app-name>
```

Choose a Compute region when prompted by the deploy form. Replace `https://<deployed-host>` with the resulting URL:

```sh
curl -fsS https://<deployed-host>/
# Contains "Flask on Nitroship" and a server-generated UTC timestamp.
curl -fsS https://<deployed-host>/api/hello
# JSON: framework "flask", message "Hello from Flask Compute", served_at timestamp.
curl -fsS https://<deployed-host>/example.css
# Contains "flask-cdn-asset"; this build asset is served from the CDN.
```

Instance storage is ephemeral. This app keeps no writable state and requires no migrations, workers, or schedulers.
