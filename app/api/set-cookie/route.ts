import { makePgClient } from '@/app/pg-client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookiesStore = await cookies();

  const client = makePgClient()
  await client.connect();
  const res = await client.query('SELECT xss_enabled FROM vunerabilities WHERE id = 1')
  const { xss_enabled } = res.rows[0]

  const name = 'secure_cookie';
  const value = 'KkKBpWVqszTEca83g8QBXzeYBhhTi01a9UPyKx192AI=';
  const httpOnly = !xss_enabled;

  cookiesStore.set({ name, value: value, httpOnly, path: '/' });
  return NextResponse.json({ ok: true });
}