import Koa from 'koa';
import serve from 'koa-static';
import { fileURLToPath } from 'node:url';

const app = new Koa();

app.use(async (ctx, next) => {
  if (ctx.method !== 'GET' && ctx.method !== 'HEAD') {
    await next();
    return;
  }

  if (ctx.path === '/') {
    const time = new Date().toISOString();
    ctx.type = 'html';
    ctx.body = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Koa on Nitroship</title>
</head>
<body>
  <h1>Koa on Nitroship</h1>
  <p>This page is rendered by the Koa server on Compute.</p>
  <p>Server time: <time datetime="${time}">${time}</time></p>
  <ul>
    <li><a href="/api/hello">JSON API</a></li>
    <li><a href="/marker.txt">Static asset served by Koa</a></li>
  </ul>
</body>
</html>`;
    return;
  }

  if (ctx.path === '/api/hello') {
    ctx.body = {
      framework: 'koa',
      message: 'Hello from Koa on Nitroship!',
      time: new Date().toISOString(),
    };
    return;
  }

  await next();
});

app.use(serve(fileURLToPath(new URL('./public/', import.meta.url))));

const port = Number(process.env.PORT || 3000);
app.listen(port, '0.0.0.0', () => {
  console.log(`Koa listening on http://0.0.0.0:${port}`);
});
