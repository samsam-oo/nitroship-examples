# Go example

A Go HTTP server using only the standard library, initialized with the official `go mod init` tooling. No external dependencies are needed, so there is no `go.sum`. The root `package main` and `go.mod` let Nitroship detect the Go preset automatically.

`GET /` renders HTML containing **Go example** and the current request's UTC server time. `GET /api/hello` returns JSON with `message: "Go example"` and `serverTime`. The page links to `/site.css`, whose source is `public/site.css` and includes the marker `go-example-asset`.

## Run locally

Requires Go 1.27 or later. From this directory:

```sh
go run .
```

Open <http://localhost:3000/>. The server binds to `0.0.0.0:$PORT`, defaulting to `3000`; use `PORT=8080 go run .` to select a different port. It serves `/site.css` locally as well.

```sh
curl -i http://localhost:3000/
curl -i http://localhost:3000/api/hello
curl -i http://localhost:3000/site.css
```

## Deploy and verify

From the examples repository root:

```sh
ntro deploy go --app <name>
```

Or use [Deploy on Nitroship](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=go). Choose a Compute region during deployment; the template does not pin one.

Replace `<deployed-host>` with the deployment hostname:

```sh
curl -i https://<deployed-host>/
curl -i https://<deployed-host>/api/hello
curl -i https://<deployed-host>/site.css
```

The HTML and JSON requests run on Compute and return freshly generated UTC timestamps. Repeat them to see the times change. Nitroship publishes `public/` assets to the CDN root, so `/site.css` should contain `go-example-asset`. No custom Dockerfile, secrets, or build configuration are needed.
