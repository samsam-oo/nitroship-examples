import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const response = path === '/old'
    ? NextResponse.redirect(new URL('/', request.url))
    : path === '/r/ssr'
      ? NextResponse.rewrite(new URL('/ssr', request.url))
      : NextResponse.next();
  response.headers.set('x-example-proxy', 'next');
  return response;
}

export const config = {
  matcher: ['/old', '/r/ssr', '/ssr', '/isr', '/cron', '/'],
};
