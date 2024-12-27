import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

import { parkrunGet, ParkrunRun } from '$lib/server/parkrun';

export const load: LayoutServerLoad = async ({ url, locals }) => {
  if (
    !locals.user &&
    url.pathname != '/login' &&
    url.pathname != '/signup' &&
    url.pathname != '/logout'
  )
    redirect(307, '/login');

  let runs: ParkrunRun[] = [];
  if (locals.user) {
    const runsRaw = await parkrunGet(
      '/v1/events/147/runs',
      { OrderByDesc: 'EventNumber,RunId' },
      { dataName: 'Runs', rangeName: 'RunsRange' }
    );

    runs = runsRaw.map((r: Record<string, string>) => {
      return { ...new ParkrunRun(r) };
    });
  }

  return {
    session: {
      userId: locals.user ? locals.user.id : '',
      username: locals.user ? locals.user.username : '',
      isAdmin: locals.user ? !!locals.user.is_admin : false
    },
    runs,
    url: url.pathname
  };
};
