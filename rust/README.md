# Rust

A dependency-free Cargo binary using the Rust standard library for a small HTTP demonstration: request-time HTML at `/`, JSON at `/api/hello`, and `public/site.css`. Nitroship detects `Cargo.toml` and `src/main.rs`, builds the release binary with its managed Rust container preset, and runs it on Compute. The public stylesheet is also extracted to the CDN root; the embedded copy serves local requests. No Dockerfile, Nitroship build configuration, secrets, or custom environment variables are required. This intentionally small, sequential HTTP example is not a general-purpose HTTP server.

## Run locally

Requires Rust 1.85 or later (edition 2024) and Cargo. From this directory:

```sh
cargo run
```

Open <http://localhost:3000/>. The app binds `0.0.0.0:$PORT`, defaulting to `3000`.

## Deploy and verify

From the examples repository root, choose Compute regions during deployment:

```sh
ntro deploy rust --app <app-name>
```

```sh
curl -fsS https://<deployed-host>/
curl -fsS https://<deployed-host>/api/hello
curl -fsS https://<deployed-host>/site.css
```

Expect `Rust example` in the page and JSON `message`, a request-time UNIX `serverTime`, and `rust-example-asset` in the stylesheet. Repeat requests after a second to observe a changed timestamp. Only public assets go to the CDN; the server code stays in the container.
