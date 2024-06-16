import { auth, db } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { SqliteError } from 'better-sqlite3';

import type { PageServerLoad, Actions } from './$types';
import { generateIdFromEntropySize } from 'lucia';
import { Argon2id } from 'oslo/password';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) redirect(307, '/');
  if (!(env.SIGNUP_ENABLED == 'true')) redirect(307, '/login');
  return {};
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const username = formData.get('username');
    const password = formData.get('password');

    if (
      typeof username !== 'string' ||
      username.length < 4 ||
      username.length > 31 ||
      !/^[a-z0-9_-]+$/.test(username)
    ) {
      return fail(400, {
        message: 'Invalid username'
      });
    }
    if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
      return fail(400, {
        message: 'Invalid password'
      });
    }

    const argon2id = new Argon2id();
    const userId = generateIdFromEntropySize(10);

    try {
      await db
        .prepare(
          'insert into user (id, username, password_hash, is_enabled, is_admin, reset_next_login) values (?, ?, ?, ?, ?, ?)'
        )
        .run(
          userId,
          username.toLowerCase(),
          await argon2id.hash(password),
          env.CREATE_USER_ENABLED == 'true' ? 1 : 0,
          0,
          0
        );

      const session = await auth.createSession(userId, {});
      if ((await db.prepare('select is_enabled from user where id = ?').pluck().get(userId)) == 0) {
        await auth.invalidateSession(session.id);
        throw new Error('AUTH_USER_DISABLED');
      }
      const sessionCookie = auth.createSessionCookie(session.id);
      cookies.set(sessionCookie.name, sessionCookie.value, {
        path: '.',
        ...sessionCookie.attributes
      });
    } catch (e) {
      if (e instanceof SqliteError && e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return fail(400, {
          message: 'Username already taken'
        });
      } else if (e instanceof Error && e.message === 'AUTH_USER_DISABLED') {
        return fail(403, {
          message: 'Account created, but not yet enabled'
        });
      }
      return fail(500, {
        message: 'An unknown error occurred'
      });
    }

    throw redirect(307, '/');
  }
};
