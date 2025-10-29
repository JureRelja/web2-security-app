"use client"

import { useEffect, useState } from "react";
import { toggleXSS } from "../actions";

export default function XSS({ enabled }: { enabled: boolean }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [vulnerabilityEnabled, setVulnerabilityEnabled] = useState(enabled);

  const [cookie, setCookie] = useState<string | undefined>(undefined);
  const [cookieLoaded, setCookieLoaded] = useState(false);

  const handleXssSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true);
    await toggleXSS(!vulnerabilityEnabled)
    window.location.reload();
  }
  
  const submitForm = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.closest('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
  }

  const handleCookie = () => {
    const raw = document.cookie.split('; ').find(c => c.startsWith('secure_cookie='));
    const decoded = raw ? decodeURIComponent(raw.split('=')[1]) : undefined;

    setCookie(decoded);
    setCookieLoaded(true);
  }

  const createCookie = async () => {
    fetch('/api/set-cookie', {
      method: 'POST',
    }).finally(() => {
      setIsReady(true);
    });
  }

  useEffect(() => {
    createCookie();
  }, [vulnerabilityEnabled]);
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Cross-site scripting (XSS) - krađa tokena unutar kolačića</h2>
      <form onSubmit={handleXssSubmit}>
        <input 
          type="checkbox"
          id="xss-toggle"
          checked={vulnerabilityEnabled}
          onChange={(e) => setVulnerabilityEnabled(e.target.checked)}
          onClick={submitForm}
          disabled={isLoading || !isReady}
        />
        <label htmlFor="xss-toggle" className="ml-2 text-xl">
          Ranjivost uključena
        </label>
      </form>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 cursor-pointer"
        type="button"
        onClick={handleCookie}
        disabled={isLoading || !isReady}
        >
        Dohvati kolačić
      </button>

      {cookieLoaded && 
        <div className="flex flex-col mt-2">
          <span className="font-bold">Sadržaj kolačića:</span>
          <span>{!cookie ? 'Nema kolačića' : cookie}</span>
        </div>
      }
    </div>
  )
}
