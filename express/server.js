const express = require('express');
const path = require('node:path');

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_request, response) => {
  const time = new Date().toISOString();
  response.type('html').send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Express on Nitroship</title>
</head>
<body>
  <main>
    <h1>Express on Nitroship</h1>
    <p>Server time: <time datetime="${time}">${time}</time></p>
    <p>This HTML is generated for each request on Compute.</p>
    <ul>
      <li><a href="/api/hello">JSON API</a></li>
      <li><a href="/marker.txt">Static asset served by Express</a></li>
    </ul>
  </main>
</body>
</html>`);
});

app.get('/api/hello', (_request, response) => {
  response.json({
    framework: 'express',
    message: 'Hello from Express on Nitroship!',
    time: new Date().toISOString()
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Express listening on 0.0.0.0:${port}`);
});
