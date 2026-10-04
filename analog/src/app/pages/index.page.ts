import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectLoad } from '@analogjs/router';
import { load } from './index.server';

@Component({
  selector: 'app-home',
  template: `
    <h1>Analog on Nitroship</h1>
    <p>Server time: <time>{{ data().serverTime }}</time></p>
    <p>This value comes from a server-only page loader.</p>
    <p><a href="/api/hello">JSON endpoint</a> · <a href="/marker.txt">Static asset</a></p>
  `,
})
export default class Home {
  data = toSignal(injectLoad<typeof load>(), { requireSync: true });
}
