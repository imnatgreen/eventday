import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { parse } from 'node-html-parser';
import { reqConfig } from '$lib/server/utils';


export const GET: RequestHandler = async ({ url }) => {
	const max = Number(url.searchParams.get('max') ?? '6');

	if (isNaN(max) || max > 10) {
		throw error(400, 'max must be a number not greater than 10');
	}

  const eventsPageRes = await fetch(
		'https://www.parkrun.org.uk/burnley-juniors/results/eventhistory/',
		reqConfig
	);

	const eventsPageText = await eventsPageRes.text();
	const eventsPage = parse(eventsPageText);

	const eventsTable = eventsPage.querySelector('table.Results-table tbody');

	if (!eventsTable) throw error(500, 'events table not found');
	const events: ParkrunEvent[] = eventsTable
		.querySelectorAll('tr')
		.slice(0, max)
		.map((row) => ({
			id: Number(row.getAttribute('data-parkrun') ?? ''),
			date: row.getAttribute('data-date') ?? '',
			finishers: Number(row.getAttribute('data-finishers') ?? ''),
			volunteers: Number(row.getAttribute('data-volunteers') ?? ''),
		}));

	return new Response(JSON.stringify(events));
};