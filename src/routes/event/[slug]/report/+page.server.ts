import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
  const res = await fetch(`/api/run-report?event=${params.slug}`);
  
  const data: ParkrunRunReport = await res.json();
  
  return {
    report: data,
  }
};