# FastAPI

A minimal application initialized with `uv init`. Nitroship auto-detects the `fastapi` container preset from `pyproject.toml`: Uvicorn serves a server-generated page with the request time and `/api/hello` on Compute, while `public/example.css` is extracted to the CDN at `/example.css`. No Dockerfile or Nitroship-specific build configuration is needed.

## Run locally

From this directory, use Python 3.13 and uv (the manifest and `uv.lock` are committed):

```sh
uv sync --frozen
uv run uvicorn main:app --host 0.0.0.0 --port 3000
```

Open `http://localhost:3000/` or `/docs` for FastAPI's interactive API documentation. The local static mount also serves the public stylesheet; Nitroship serves it from the CDN. No database or required environment variables are used. The managed Uvicorn server binds `0.0.0.0:$PORT` (default `3000`).

## Deploy and verify

From the repository root:

```sh
ntro deploy fastapi --app <app-name>
```

Choose a Compute region when prompted by the deploy form. Replace `https://<deployed-host>` with the resulting URL:

```sh
curl -fsS https://<deployed-host>/
# Contains "FastAPI on Nitroship" and a server-generated UTC timestamp.
curl -fsS https://<deployed-host>/api/hello
# JSON: framework "fastapi", message "Hello from FastAPI Compute", served_at timestamp.
curl -fsS https://<deployed-host>/example.css
# Contains "fastapi-cdn-asset"; this build asset is served from the CDN.
```

Instance storage is ephemeral. This app keeps no writable state and requires no migrations, workers, or schedulers.
