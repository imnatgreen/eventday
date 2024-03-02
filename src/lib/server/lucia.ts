import { lucia } from 'lucia';
import { betterSqlite3 } from '@lucia-auth/adapter-sqlite';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';

import sqlite from 'better-sqlite3';
// import fs from 'fs';

const db = sqlite('main.db');
// db.exec(fs.readFileSync('schema.sql', 'utf8'));

export const auth = lucia({
  adapter: betterSqlite3(db, {
    user: 'user',
    session: 'user_session',
    key: 'user_key'
  }),
  middleware: sveltekit(),
  env: dev ? 'DEV' : 'PROD',
  getUserAttributes: (data) => {
    return {
      username: data.username,
      is_enabled: data.is_enabled,
      is_admin: data.is_admin
    };
  }
});

export type Auth = typeof auth;
