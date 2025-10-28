import { Client } from 'pg';
import XSS from './components/xss';
import HashlessPasswords from "./components/hashless-passwords";

export default async function Home() {
  const client = new Client()
  await client.connect()
  
  const response = await client.query('SELECT vunerabilities.xss_enabled, vunerabilities.unsecure_data_saving_enabled FROM vunerabilities WHERE id = 1')
  await client.end()

  const { xss_enabled, unsecure_data_saving_enabled } = response.rows[0]

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <XSS enabled={xss_enabled} />

        <HashlessPasswords enabled={unsecure_data_saving_enabled} />
      </main>
    </div>
  );
}
