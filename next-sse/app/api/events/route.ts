export const dynamic = 'force-dynamic';

export function GET(request: Request) {
  const rawLimit = new URL(request.url).searchParams.get('limit');
  const limit = rawLimit === null ? undefined : Number(rawLimit);
  if (limit !== undefined && (!Number.isSafeInteger(limit) || limit < 1 || limit > 1000)) {
    return new Response('limit must be an integer from 1 to 1000\n', { status: 400 });
  }

  const previous = request.headers.get('last-event-id');
  const resumed = previous === null ? 0 : Number(previous);
  let nextId = Number.isSafeInteger(resumed) && resumed >= 0 && resumed < Number.MAX_SAFE_INTEGER
    ? resumed + 1
    : 1;
  const encoder = new TextEncoder();
  let tickTimer: NodeJS.Timeout | undefined;
  let heartbeatTimer: NodeJS.Timeout | undefined;
  let sent = 0;
  let finished = false;
  let cleanup = () => {};

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      cleanup = () => {
        clearInterval(tickTimer);
        clearInterval(heartbeatTimer);
        request.signal.removeEventListener('abort', abort);
      };
      const abort = () => {
        if (finished) return;
        finished = true;
        cleanup();
        controller.close();
      };
      request.signal.addEventListener('abort', abort, { once: true });
      if (request.signal.aborted) {
        abort();
        return;
      }

      controller.enqueue(encoder.encode('retry: 1000\n\n'));
      tickTimer = setInterval(() => {
        if (finished) return;
        controller.enqueue(encoder.encode(`id: ${nextId}\nevent: tick\ndata: ${JSON.stringify({ time: new Date().toISOString() })}\n\n`));
        nextId++;
        sent++;
        if (sent === limit || nextId > Number.MAX_SAFE_INTEGER) {
          finished = true;
          cleanup();
          controller.close();
        }
      }, 1000);
      heartbeatTimer = setInterval(() => {
        if (!finished) controller.enqueue(encoder.encode(': heartbeat\n\n'));
      }, 15000);
    },
    cancel() {
      finished = true;
      cleanup();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}
