import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { SqliteError } from 'better-sqlite3';

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (session) throw redirect(307, '/');
  return {};
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const username = formData.get('username');
    const password = formData.get('password');
    // basic check
    if (typeof username !== 'string' || username.length < 4 || username.length > 31) {
      return fail(400, {
        message: 'Invalid username'
      });
    }
    if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
      return fail(400, {
        message: 'Invalid password'
      });
    }
    try {
      const user = await auth.createUser({
        key: {
          providerId: 'username', // auth method
          providerUserId: username.toLowerCase(), // unique id when using "username" auth method
          password // hashed by Lucia
        },
        attributes: {
          username,
          is_admin: 0,
          is_enabled: 0
        }
      });
      const session = await auth.createSession({
        userId: user.userId,
        attributes: {}
      });
      if (session.user.is_enabled == 0) {
        await auth.invalidateSession(session.sessionId);
        throw new Error('AUTH_USER_DISABLED');
      }
      locals.auth.setSession(session); // set session cookie
    } catch (e) {
      // check for unique constraint error in user table
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
    // redirect to
    // make sure you don't throw inside a try/catch block!
    throw redirect(307, '/');
  }
};
