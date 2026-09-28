export const dynamic = 'force-dynamic';

export function GET(request: Request) {
  const rawLimit = new URL(request.url).searchParams.get('limit');
  const limit = rawLimit === null ? 6 : Number(rawLimit);
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 1000) {
    return new Response('limit must be an integer from 1 to 1000\n', { status: 400 });
  }

  const encoder = new TextEncoder();
  let timer: NodeJS.Timeout | undefined;
  let sent = 0;
  let finished = false;
  let stop = () => {};
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      stop = () => {
        clearInterval(timer);
        request.signal.removeEventListener('abort', abort);
      };
      const abort = () => {
        if (finished) return;
        finished = true;
        stop();
        controller.close();
      };
      request.signal.addEventListener('abort', abort, { once: true });
      if (request.signal.aborted) {
        abort();
        return;
      }
      timer = setInterval(() => {
        if (finished) return;
        sent++;
        controller.enqueue(encoder.encode(`${sent} ${new Date().toISOString()}\n`));
        if (sent === limit) {
          finished = true;
          stop();
          controller.close();
        }
      }, 500);
    },
    cancel() {
      finished = true;
      stop();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}
