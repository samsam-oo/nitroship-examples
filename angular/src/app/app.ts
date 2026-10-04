import { Component, PLATFORM_ID, TransferState, inject, makeStateKey } from '@angular/core';
import { isPlatformServer } from '@angular/common';

const renderedAtKey = makeStateKey<string>('rendered-at');

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly state = inject(TransferState);
  protected readonly renderedAt = this.serverTime();

  private serverTime(): string {
    if (isPlatformServer(inject(PLATFORM_ID))) {
      const value = new Date().toISOString();
      this.state.set(renderedAtKey, value);
      return value;
    }
    return this.state.get(renderedAtKey, '');
  }
}
