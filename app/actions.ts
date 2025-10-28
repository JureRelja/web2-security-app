'use server';

import { Client } from 'pg';

export async function toggleXSS(enabled: boolean) {
  const client = new Client()
    await client.connect()
    
    await client.query('UPDATE vunerabilities SET xss_enabled = $1 WHERE id = 1', [enabled])
    await client.end()
};

export async function toggleUnsecureDataSaving(enabled: boolean) {
  const client = new Client()
    await client.connect()
    
    await client.query('UPDATE vunerabilities SET unsecure_data_saving_enabled = $1 WHERE id = 1', [enabled])
    await client.end()
};

export async function storePassword(password: string) {
  const client = new Client()
  await client.connect()

  const passwordForStorage = password
  
  const res = await client.query('SELECT unsecure_data_saving_enabled FROM vunerabilities WHERE id = 1')
  const { unsecure_data_saving_enabled } = res.rows[0]

  if (!unsecure_data_saving_enabled) {
  }

  await client.query('INSERT INTO passwords (password) VALUES ($1)', [passwordForStorage])
  await client.end()
}
