# Next.js SSE and streaming

A Next.js 16.3 App Router app that exercises unbuffered streaming on Nitroship Compute: numbered SSE ticks with `Last-Event-ID` resume, periodic heartbeat comments and retry hint, a separate chunked text route, and Suspense-streamed SSR. The page uses `EventSource` to show connection state and the most recent tick.

## Run locally

Requires Node.js 22 or later.

```sh
npm ci
npm run dev
```

Open <http://localhost:3000>. For production behavior, run `npm run build && npm run start` instead.

## Deploy

From the examples repository root:

```sh
ntro deploy next-sse --app my-next-sse
```

Or use [Deploy on Nitroship](https://nitroship.co/new/deploy?repo=samsam-oo/nitroship-examples&dir=next-sse). The config targets `jp-tyo` Compute at the `standard` tier.

## Check streaming

```sh
curl -N 'https://<app>.ntro.run/api/events?limit=5'
curl -N -H 'Last-Event-ID: 10' 'https://<app>.ntro.run/api/events?limit=3'
curl -N 'https://<app>.ntro.run/api/stream?limit=6'
curl -N 'https://<app>.ntro.run/'
```

`-N` disables curl's output buffering. SSE ticks arrive roughly one second apart; the second command starts at ID 11. The plain text route emits one timestamped line every 500 ms. Watch the terminal as each timestamp appears (rather than waiting for command completion); on the page, the Suspense fallback `Loading server time…` arrives before the delayed server-rendered timestamp. An unlimited `/api/events` stream also emits `: heartbeat` comments every 15 seconds. Open the page to see live ticks, reconnect status and the last event ID.

## Limits

`limit` counts messages in this connection (1–1000); omit it for unbounded SSE. A disconnected stream stops its timers. Streaming keeps the Compute instance unfrozen while the connection is open, so disconnect idle clients; the regular response body limit does not apply to streaming responses. The service's request-duration limit can still close long-lived streams, and EventSource reconnects automatically. `Last-Event-ID` resumes event numbering, not historical event data.
