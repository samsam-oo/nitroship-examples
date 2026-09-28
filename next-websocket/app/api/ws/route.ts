import { experimental_upgradeWebSocket, type WebSocket, type WebSocketData } from '@vercel/functions';

export const dynamic = 'force-dynamic';

// Presence and broadcasts are local to this running Compute instance.
const clients = new Set<WebSocket>();

function broadcast(payload: string) {
  for (const client of clients) {
    if (client.readyState === client.OPEN) client.send(payload);
  }
}

export async function GET(request: Request) {
  // The upgrade context exists only in Nitroship's deployed Next.js launcher.
  if (request.headers.get('upgrade')?.toLowerCase() !== 'websocket') {
    return new Response('Expected a WebSocket upgrade\n', { status: 426, headers: { Upgrade: 'websocket' } });
  }
  return experimental_upgradeWebSocket((ws) => {
    clients.add(ws);
    ws.send(JSON.stringify({ type: 'welcome', clients: clients.size }));
    broadcast(JSON.stringify({ type: 'presence', clients: clients.size }));

    ws.on('message', (data: WebSocketData, isBinary: boolean) => {
      if (isBinary) {
        ws.close(1003, 'Text messages only');
        return;
      }
      const text = data.toString();
      try {
        const frame: unknown = JSON.parse(text);
        if (typeof frame === 'object' && frame !== null && 'type' in frame && frame.type === 'ping' &&
            't' in frame && typeof frame.t === 'number' && Number.isFinite(frame.t)) {
          ws.send(JSON.stringify({ type: 'pong', t: frame.t }));
          return;
        }
      } catch {
        // Ordinary chat messages are plain text, not protocol frames.
      }
      broadcast(JSON.stringify({ type: 'message', text, at: new Date().toISOString() }));
    });

    ws.on('close', () => {
      clients.delete(ws);
      broadcast(JSON.stringify({ type: 'presence', clients: clients.size }));
    });
  });
}
