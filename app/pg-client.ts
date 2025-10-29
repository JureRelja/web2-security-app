import { Client } from 'pg';

export function makePgClient() {
  return new Client({
    ssl: { rejectUnauthorized: process.env.NODE_ENV !== 'production' }
  });
}
