# Django

A trimmed official `django-admin startproject` app. Nitroship auto-detects the `django` container preset from `manage.py` and `requirements.txt`: Gunicorn serves a Django-rendered page with the request time and `/api/hello` on Compute. `collectstatic` gathers `static/example.css` into `STATIC_ROOT`; Nitroship extracts it to the CDN at `/static/example.css`, preserving `STATIC_URL`. No Dockerfile or Nitroship-specific build configuration is needed.

## Run locally

From this directory, use Python 3.13 and pip with the fully pinned `requirements.txt`:

```sh
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
export SECRET_KEY="$(python -c 'import secrets; print(secrets.token_urlsafe(50))')"
export ALLOWED_HOSTS=localhost,127.0.0.1
python manage.py runserver --insecure 0.0.0.0:3000
```

Open `http://localhost:3000/`. `DEBUG` stays false, and `--insecure` only enables the local development server's static-file handler. Production uses the CDN instead. The managed Gunicorn server binds `0.0.0.0:$PORT` (default `3000`). This example does not use a database, sessions, authentication, or migrations.

## Deploy and verify

Set `SECRET_KEY` as a secret environment variable using the generation command above. The deploy form requires this secret instead of generating its shorter default value. `ALLOWED_HOSTS` is parsed as comma-separated hostnames without schemes or ports; the form defaults to `*` so a first deployment with an unknown assigned hostname can work. Restrict it to the assigned/custom hostname after deployment. These values do not need to be provided to `collectstatic`: the build does not use signing or authentication.

From the repository root:

```sh
ntro deploy django --app <app-name>
```

Choose a Compute region when prompted by the deploy form. Replace `https://<deployed-host>` with the resulting URL:

```sh
curl -fsS https://<deployed-host>/
# Contains "Django on Nitroship" and a server-generated UTC timestamp.
curl -fsS https://<deployed-host>/api/hello
# JSON: framework "django", message "Hello from Django Compute", served_at timestamp.
curl -fsS https://<deployed-host>/static/example.css
# Contains "django-cdn-asset"; this collected build asset is served from the CDN.
```

Instance storage is ephemeral. The app keeps no writable state and requires no workers or schedulers. For a real application, use external services for durable data and uploads; Nitroship does not run migrations automatically.
