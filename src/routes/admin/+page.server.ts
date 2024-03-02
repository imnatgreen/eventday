import { auth } from '$lib/server/lucia';
// import type { User } from 'lucia';
import sqlite from 'better-sqlite3';
import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (!session) throw redirect(307, '/login');
  if (session.user.is_admin == 0) throw error(403, 'Forbidden');

  const db = sqlite('main.db');

  const users = (await db
    .prepare('select id, username, is_enabled, is_admin from user;')
    .all()) as {
    id: string;
    username: string;
    is_enabled: 0 | 1;
    is_admin: 0 | 1;
  }[];

  return {
    users: users
  };
};

export const actions: Actions = {
  toggleEnabled: async ({ request }) => {
    const formData = await request.formData();
    const formUserId = formData.get('id');
    if (!formUserId) return fail(400, { formUserId, incorrect: true });
    const userId = formUserId.toString();

    const user = await auth.getUser(userId);
    await auth.updateUserAttributes(user.userId, {
      is_enabled: user.is_enabled == 1 ? 0 : 1
    });
    await auth.invalidateAllUserSessions(user.userId);

    return {
      success: true
    };
  },
  toggleAdmin: async ({ request }) => {
    const formData = await request.formData();
    const formUserId = formData.get('id');
    if (!formUserId) return fail(400, { formUserId, incorrect: true });
    const userId = formUserId.toString();

    const user = await auth.getUser(userId);
    await auth.updateUserAttributes(user.userId, {
      is_admin: user.is_admin == 1 ? 0 : 1
    });
    await auth.invalidateAllUserSessions(user.userId);

    return {
      success: true
    };
  },
  delete: async ({ request }) => {
    const formData = await request.formData();
    const formUserId = formData.get('id');
    if (!formUserId) return fail(400, { formUserId, incorrect: true });
    const userId = formUserId.toString();

    auth.deleteUser(userId);
    return {
      success: true
    };
  }
};
