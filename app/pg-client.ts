import { Client } from 'pg';

export function makePgClient() {
  return new Client({
    ssl: { rejectUnauthorized: false } // allow TLS without verifying CA (common for Render)
  });
}