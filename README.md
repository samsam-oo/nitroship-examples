# Nitroship examples

Small apps for trying [Nitroship](https://nitroship.co) and its **Deploy on Nitroship** button.
Each directory is an independent app; the button's `dir` parameter selects it. Each directory's
README explains what it exercises and how to test it against the deployed URL.

| Example | What it exercises | Deploy |
|---|---|---|
| [`static`](static) | Static HTML with clean URLs (`/about` serves `about.html`) | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=static) |
| [`build-env`](build-env) | `build` command, `outputDirectory`, typed template env (`string`, `url`, `number`, `enum`) and a hidden generated secret | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=build-env) |
| [`static-images`](static-images) | Edge IPX image resizing, format conversion and remote allowlist (`images` block) | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=static-images) |
| [`next-websocket`](next-websocket) | Next.js App Router WebSocket chat, presence, ping latency and reconnection on Compute | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=next-websocket) |
| [`next-sse`](next-sse) | Next.js Server-Sent Events, chunked text streams and Suspense-streamed SSR on Compute | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=next-sse) |
| [`next-isr-cron`](next-isr-cron) | Next.js ISR, SSR, tagged revalidation, `crons`, proxy redirect/rewrite and `next/image` | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=next-isr-cron) |
| [`docker-realtime`](docker-realtime) | Dockerfile Compute with WebSocket echo/broadcast, SSE replay, custom `port` and `healthPath` | [![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=samsam-oo/nitroship-examples&dir=docker-realtime) |

## Add the button to your own repository

```markdown
[![Deploy on Nitroship](https://nitroship.co/button.svg)](https://nitroship.co/deploy?repo=<owner>/<repo>&ref=<branch>&dir=<subdirectory>)
```

`ref` and `dir` are optional. Describe the deploy form with a `template` block in `<dir>/nitroship.json`:

```json
{
  "build": { "command": "node build.mjs", "outputDirectory": "dist" },
  "template": {
    "name": "My app",
    "description": "Shown on the deploy page",
    "env": [
      { "key": "GREETING", "description": "Text on the page", "required": true, "default": "Hello" },
      { "key": "SITE_URL", "type": "url", "default": "https://example.com" },
      { "key": "PAGE_SIZE", "type": "number", "default": "20" },
      { "key": "THEME", "type": "enum", "options": ["light", "dark"], "default": "light" },
      { "key": "API_SECRET", "type": "string", "generated": true, "secret": true }
    ]
  }
}
```

- `required: true` makes a variable mandatory; `secret: true` stores it encrypted and hides it.
- `type` is `string` (default), `number`, `url` or `enum`; `enum` needs `options`. Values are always
  submitted as strings; use `enum` with `["true", "false"]` for a boolean.
- `generated: true` pre-fills an editable random value (`string` only, no `default`). It is **not**
  secret by itself; add `secret: true` to hide it. The old `"generate": "secret"` field is rejected.
- `build.installCommand` / `build.command` replace the detected install and build commands;
  `build.outputDirectory` replaces the `dist`/`build`/`out` search. A root `Dockerfile` takes
  precedence over `build`.

Next.js and Dockerfile apps run on Compute and need target regions:

```json
{ "compute": { "regions": ["jp-tyo"], "tier": "standard", "port": 8080, "healthPath": "/healthz" } }
```

`port` and `healthPath` are optional; see [`docker-realtime`](docker-realtime).

## Deploy with the CLI instead

```bash
ntro login
ntro apps create my-static
ntro deploy static --app my-static
```
