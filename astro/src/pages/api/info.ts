import type { APIRoute } from 'astro';

export const GET: APIRoute = () => new Response(JSON.stringify({
  framework: 'astro',
  message: 'Hello from the Astro server',
  generatedAt: new Date().toISOString(),
}), {
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  },
});
