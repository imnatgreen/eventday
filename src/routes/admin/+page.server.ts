import { auth, db } from '$lib/server/auth';
import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) throw redirect(307, '/login');
  if (locals.user.is_admin == 0) throw error(403, 'Forbidden');

  const users = (await db
    .prepare('select id, username, is_enabled, is_admin, reset_next_login from user;')
    .all()) as {
    id: string;
    username: string;
    is_enabled: 0 | 1;
    is_admin: 0 | 1;
    reset_next_login: 0 | 1;
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

    const isEnabled = await db
      .prepare('select is_enabled from user where id = ?')
      .pluck()
      .get(userId);
    await db
      .prepare('update user set is_enabled = ? where id = ?')
      .run(isEnabled == 1 ? 0 : 1, userId);
    await auth.invalidateUserSessions(userId);

    return {
      success: true
    };
  },
  toggleAdmin: async ({ request }) => {
    const formData = await request.formData();
    const formUserId = formData.get('id');
    if (!formUserId) return fail(400, { formUserId, incorrect: true });
    const userId = formUserId.toString();

    const isAdmin = await db.prepare('select is_admin from user where id = ?').pluck().get(userId);
    await db.prepare('update user set is_admin = ? where id = ?').run(isAdmin == 1 ? 0 : 1, userId);
    await auth.invalidateUserSessions(userId);

    return {
      success: true
    };
  },
  toggleResetNextLogin: async ({ request }) => {
    const formData = await request.formData();
    const formUserId = formData.get('id');
    if (!formUserId) return fail(400, { formUserId, incorrect: true });
    const userId = formUserId.toString();

    const isResetNextLogin = await db
      .prepare('select reset_next_login from user where id = ?')
      .pluck()
      .get(userId);
    await db
      .prepare('update user set reset_next_login = ? where id = ?')
      .run(isResetNextLogin == 1 ? 0 : 1, userId);

    return {
      success: true
    };
  },
  delete: async ({ request }) => {
    const formData = await request.formData();
    const formUserId = formData.get('id');
    if (!formUserId) return fail(400, { formUserId, incorrect: true });
    const userId = formUserId.toString();

    await auth.invalidateUserSessions(userId);
    await db.prepare('delete from user where id = ?').run(userId);
    return {
      success: true
    };
  }
};
