# Phoenix

A stock Phoenix 1.8 project without Ecto, with a request-time HEEx page at `/`, JSON at `/api/hello`, and Tailwind/esbuild assets plus a public marker. Nitroship detects the Phoenix dependency in `mix.exs`, builds an Elixir release with its managed container preset, runs the HTTP endpoint on Compute, and extracts `priv/static/` to the CDN. No Dockerfile or Nitroship-specific build configuration is needed; `.tool-versions` declares Elixir 1.18 with Erlang/OTP 27.

## Run locally

Requires the declared Elixir/Erlang toolchain. From this directory:

```sh
mix setup
mix phx.server
```

Open <http://localhost:4000/>. The development server uses port 4000; Nitroship's managed release binds `0.0.0.0:$PORT` with default 3000. There is no database or migration step. Development keys in Phoenix's generated dev/test configuration are not production credentials.

## Deploy and verify

Generate a stable endpoint secret with `mix phx.gen.secret` and set secret `SECRET_KEY_BASE`. It must be at least 64 characters; the Deploy form's generic 43-character generator is unsuitable, so the template requires your generated key. Set `PHX_HOST` to the public hostname without scheme or port. From the examples repository root, choose Compute regions during deployment:

```sh
ntro deploy phoenix --app <app-name>
```

```sh
curl -fsS https://<deployed-host>/
curl -fsS https://<deployed-host>/api/hello
curl -fsS https://<deployed-host>/marker.txt
```

Expect `Hello Phoenix from Nitroship` and a fresh UTC timestamp in the page, JSON containing that `message`, `framework: "Phoenix"` and `time`, and `Phoenix Nitroship CDN asset` in the marker. Curl the fingerprinted CSS/JS URLs referenced by the HTML too; Phoenix's build digests those assets and Nitroship publishes them to the CDN. Only browser assets are extracted, never Elixir source. The managed release enables `PHX_SERVER=true`.

Temporary release files and crash dumps use `/tmp/phoenix`; filesystem state is ephemeral, unshared, and unsuitable for uploads. Use external services for durable state and object storage for uploads. Nitroship does not run migrations, queue workers, or schedulers automatically.
