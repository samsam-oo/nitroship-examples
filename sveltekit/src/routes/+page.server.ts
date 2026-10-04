import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ setHeaders }) => {
	setHeaders({ 'cache-control': 'no-store' });
	return {
		serverTime: new Date().toISOString(),
		runtime: 'node-server'
	};
};
