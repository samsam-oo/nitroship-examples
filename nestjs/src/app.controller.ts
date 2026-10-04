import { Controller, Get, Header } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Header('Content-Type', 'text/html; charset=utf-8')
  index() {
    const time = new Date().toISOString();
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>NestJS on Nitroship</title></head><body><h1>NestJS on Nitroship</h1><p>Rendered on the server at <time>${time}</time>.</p><p><a href="/api/hello">JSON endpoint</a> · <a href="/marker.txt">Static asset</a></p></body></html>`;
  }

  @Get('api/hello')
  hello() {
    return { framework: 'nestjs', message: 'Hello from NestJS', time: new Date().toISOString() };
  }
}
