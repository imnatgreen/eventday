import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, url }) => {
	const eventsRes = await fetch('/api/recent-events');

	const events: ParkrunEvent[] = await eventsRes.json();

	return {
		events: events,
		url: url.pathname
	};
};