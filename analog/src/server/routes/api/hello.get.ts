import { defineEventHandler } from 'h3';

export default defineEventHandler(() => ({ framework: 'analog', message: 'Hello from Analog', serverTime: new Date().toISOString() }));
