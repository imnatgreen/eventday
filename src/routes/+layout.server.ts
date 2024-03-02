import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

import { parkrunGet, ParkrunRun } from '$lib/server/parkrun';

export const load: LayoutServerLoad = async ({ url, locals }) => {
  const session = await locals.auth.validate();
  if (
    !session &&
    url.pathname != '/login' &&
    url.pathname != '/signup' &&
    url.pathname != '/logout'
  )
    throw redirect(307, '/login');

  let runs: ParkrunRun[] = [];
  if (session) {
    const runsRaw = await parkrunGet(
      '/v1/events/147/runs',
      { OrderByDesc: 'EventNumber,RunId' },
      { dataName: 'Runs', rangeName: 'RunsRange' }
    );

    runs = runsRaw.reverse().map((r: Record<string, string>) => {
      return { ...new ParkrunRun(r) };
    });
  }

  return {
    session: {
      userId: session ? session.user.userId : '',
      username: session ? session.user.username : ''
    },
    runs: runs,
    url: url.pathname
  };
};
