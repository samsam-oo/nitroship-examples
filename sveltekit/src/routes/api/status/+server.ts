import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => json({
	framework: 'sveltekit',
	runtime: 'node-server',
	serverTime: new Date().toISOString()
}, { headers: { 'cache-control': 'no-store' } });
