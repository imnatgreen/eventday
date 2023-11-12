import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { parse } from 'node-html-parser';
import { reqConfig, firstName, titleCase } from '$lib/server/utils';


export const GET: RequestHandler = async ({ url }) => {
	const event = Number(url.searchParams.get('event') ?? 'latestresults');

	if (isNaN(event)) {
		throw error(400, 'event id must be a number');
	}

  const resultPageRes = await fetch(
		`https://www.parkrun.org.uk/burnley-juniors/results/${event}/`,
		reqConfig
	);

	const resultPageText = await resultPageRes.text();
	const resultPage = parse(resultPageText);

	const resultsTable = resultPage.querySelector('table.Results-table tbody');

	if (!resultsTable) throw error(500, 'results table not found');
	const results: {
    position: number;
    name: string;
    parkruns: number;
    firstTimer: boolean;
    newPb: boolean;
  }[] = resultsTable
		.querySelectorAll('tr')
		.map((row) => ({
			position: Number(row.getAttribute('data-position') ?? ''),
			name: row.getAttribute('data-name') ?? '',
      parkruns: Number(row.getAttribute('data-runs') ?? ''),
      firstTimer: row.getAttribute('data-achievement') == 'First Timer!' ? true : false,
      newPb: row.getAttribute('data-achievement') == 'New PB!' ? true : false,
		}));

  const volunteersList = resultPage.querySelector('.paddedt.left :nth-child(2)');
  if (!volunteersList) throw error(500, 'volunteers not found');
  const volunteers = volunteersList
    .querySelectorAll('a')
    .map((li) => titleCase(li.innerText));
    
  const report: ParkrunRunReport = {
    id: event,
    participants: results.length,
    firstTimers: results.filter(result => result.firstTimer).map(result => firstName(result.name)).sort(),
    newPBs: results.filter(result => result.newPb).map(result => firstName(result.name)).sort(),
    milestones: {
      half: results.filter(result => result.parkruns == 11).map(result => firstName(result.name)).sort(),
      full: results.filter(result => result.parkruns == 21).map(result => firstName(result.name)).sort(),
      ultra: results.filter(result => result.parkruns == 50).map(result => firstName(result.name)).sort(),
      hundred: results.filter(result => result.parkruns == 100).map(result => firstName(result.name)).sort(),
    },
    volunteers: volunteers,
  };

	return new Response(JSON.stringify(report));
};