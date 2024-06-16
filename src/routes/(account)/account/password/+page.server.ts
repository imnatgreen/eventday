import { db } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';
import { Argon2id } from 'oslo/password';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) throw redirect(307, '/login');
  if (!locals.user.reset_next_login) throw redirect(307, '/');
  return {};
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const password = formData.get('password');

    if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
      return fail(400, {
        message: 'Invalid password'
      });
    }

    const argon2id = new Argon2id();

    try {
      await db
        .prepare('update user set password_hash = ?, reset_next_login = 0 where id = ?')
        .run(await argon2id.hash(password), locals.user?.id);
    } catch (e) {
      return fail(500, {
        message: 'An unknown error occurred'
      });
    }

    throw redirect(307, '/');
  }
};
