import { Client } from 'pg';
import XSS from './components/xss';
import HashlessPasswords from "./components/hashless-passwords";

export default async function Home() {
  const client = new Client()
  await client.connect()
  
  const res = await client.query('SELECT NOW()')
  await client.end()

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <XSS />

        <HashlessPasswords />
      </main>
    </div>
  );
}
