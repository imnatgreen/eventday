import type { LayoutServerLoad } from './$types';

import { ParkrunResult, ParkrunVolunteer, parkrunGet } from '$lib/server/parkrun';

export const load: LayoutServerLoad = async ({ params }) => {
  const [resultsRaw, volunteersRaw] = await Promise.all([
    parkrunGet(
      `/v1/events/147/runs/${params.slug}/results`,
      { expandedDetails: true },
      { dataName: 'Results', rangeName: 'ResultsRange' }
    ),
    parkrunGet(
      `/v1/events/147/runs/${params.slug}/volunteers`,
      { expandedDetails: true },
      { dataName: 'Volunteers', rangeName: 'VolunteersRange' }
    )
  ]);

  const results: ParkrunResult[] = resultsRaw.map((r: Record<string, string>) => {
    return { ...new ParkrunResult(r) };
  });
  const volunteers: ParkrunVolunteer[] = volunteersRaw.map((r: Record<string, string>) => {
    return { ...new ParkrunVolunteer(r) };
  });

  return {
    results: results,
    volunteers: volunteers
  };
};
