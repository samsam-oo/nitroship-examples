# Next.js WebSocket chat

This Next.js App Router example uses `@vercel/functions`' `experimental_upgradeWebSocket` at `GET /api/ws`. It broadcasts text messages and presence to clients **on the same Compute instance**, reports round-trip ping latency, and reconnects with capped exponential backoff. Open two tabs to try the chat. There is no shared store or message history: clients on different instances do not see each other.

## Run locally

Requires Node 22 or newer:

```sh
cd next-websocket
npm install
npm run dev
# Visit http://localhost:3000
```

The page renders locally, but WebSocket upgrades at `/api/ws` **cannot work under `next dev` or `next start`**: those servers do not supply the upgrade context provided by Nitroship's deployed Next.js launcher. A plain HTTP request to `/api/ws` returns 426. Test the socket on a Nitroship deployment instead.

## Deploy and test

From the examples repository root:

```sh
ntro apps create next-websocket
ntro deploy next-websocket --app next-websocket
```

Or use the [Deploy on Nitroship button](https://nitroship.co/new/deploy?repo=samsam-oo/nitroship-examples&dir=next-websocket). The configuration deploys to `jp-tyo` at the `standard` Compute tier. Visit the deployed URL to inspect connection state, instance-local client count, ping latency, and chat messages. In Node 22+, run this against the deployment (replace the URL if you use a custom domain):

```sh
WS_URL=wss://next-websocket.ntro.run/api/ws node --input-type=module -e '
const ws = new WebSocket(process.env.WS_URL);
const timeout = setTimeout(() => { console.error("Timed out"); ws.close(); process.exitCode = 1; }, 10000);
ws.addEventListener("open", () => ws.send(JSON.stringify({ type: "ping", t: Date.now() })));
ws.addEventListener("message", ({ data }) => {
  const frame = JSON.parse(data);
  console.log(frame);
  if (frame.type === "pong") { clearTimeout(timeout); console.log(`RTT: ${Date.now() - frame.t} ms`); ws.close(); }
});
ws.addEventListener("error", (error) => { clearTimeout(timeout); console.error(error); process.exitCode = 1; });
'
```

Each connection is pinned to one instance and closes after **at most one hour**. A reconnect may reach a different instance; the in-memory chat and presence are not shared across replicas. Binary messages are rejected, and the default WebSocket message limit is 256 KiB.
