# Express

A minimal [Express getting-started](https://expressjs.com/en/starter/hello-world.html) app with request-time HTML at `/`, a JSON API at `/api/hello`, and `public/marker.txt` served at `/marker.txt`. Nitroship detects the production `express` dependency and runs `node server.js` on Compute; Express serves its own static assets, with no separate CDN directory or build step. The template needs no secrets or custom environment variables, and you choose Compute regions when deploying.

## Run locally

Requires Node.js 20 or later. From this directory:

```sh
npm ci
npm start
```

Open <http://localhost:3000>. The server binds to `0.0.0.0` using the managed `PORT` variable, or `3000` locally.

## Deploy and verify

From the examples repository root:

```sh
ntro deploy express --app <app-name>
```

Or use [Deploy on Nitroship](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=express).

```sh
curl https://<deployed-host>
curl https://<deployed-host>/api/hello
curl https://<deployed-host>/marker.txt
```

The HTML shows the server's ISO request timestamp. Refresh it to see a new value; the JSON contains `framework: "express"`, a greeting in `message`, and its own request-time `time`. The asset returns `express static asset`.
