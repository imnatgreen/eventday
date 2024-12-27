import { auth } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) redirect(307, '/login');
  return {};
};

export const actions: Actions = {
  default: async ({ locals, cookies }) => {
    if (!locals.session) return fail(401);
    const sessionCookie = auth.createBlankSessionCookie();
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });
    redirect(307, '/login');
  }
};
