import { auth, db } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';
import { Argon2id } from 'oslo/password';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) redirect(307, '/');
  return {
    signupEnabled: env.SIGNUP_ENABLED == 'true'
  };
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const username = formData.get('username');
    const password = formData.get('password');

    if (
      typeof username !== 'string' ||
      username.length < 1 ||
      username.length > 31 ||
      !/^[a-z0-9_-]+$/.test(username)
    ) {
      return fail(400, {
        message: 'Invalid username'
      });
    }
    if (typeof password !== 'string' || password.length < 1 || password.length > 255) {
      return fail(400, {
        message: 'Invalid password'
      });
    }
    let existingUser;
    try {
      existingUser = (await db
        .prepare(
          'select id, username, password_hash, is_enabled, reset_next_login from user where username = ?'
        )
        .get(username.toLowerCase())) as {
        id: string;
        username: string;
        password_hash: string;
        is_enabled: 0 | 1;
        reset_next_login: 0 | 1;
      };

      const argon2id = new Argon2id();
      const validPassword = existingUser
        ? await argon2id.verify(existingUser.password_hash, password)
        : false;

      if (!existingUser || !validPassword) {
        return fail(400, {
          message: 'Incorrect username or password'
        });
      }
      if (!existingUser.is_enabled) {
        throw new Error('AUTH_USER_DISABLED');
      }
      const session = await auth.createSession(existingUser.id, {});
      const sessionCookie = auth.createSessionCookie(session.id);
      cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '.',
        ...sessionCookie.attributes
      });
    } catch (e) {
      console.log('NG-DBG', e);
      if (e instanceof Error && e.message === 'AUTH_USER_DISABLED') {
        return fail(403, {
          message: 'Account is disabled'
        });
      }
      return fail(500, {
        message: 'An unknown error occurred'
      });
    }

    if (existingUser.reset_next_login) {
      throw redirect(307, '/account/password');
    }
    throw redirect(307, '/');
  }
};
