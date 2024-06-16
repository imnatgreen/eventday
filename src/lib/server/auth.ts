import { Lucia } from 'lucia';
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';
import { dev } from '$app/environment';

import sqlite from 'better-sqlite3';

export const db = sqlite('main.db');

const adapter = new BetterSqlite3Adapter(db, { user: 'user', session: 'user_session' });

export const auth = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !dev
    }
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      is_enabled: attributes.is_enabled,
      is_admin: attributes.is_admin,
      reset_next_login: attributes.reset_next_login
    };
  }
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof auth;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  username: string;
  is_enabled: 0 | 1;
  is_admin: 0 | 1;
  reset_next_login: 0 | 1;
}
