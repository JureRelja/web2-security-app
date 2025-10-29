"use client"

import { useState } from 'react';
import { storePassword, toggleUnsecureDataSaving } from '../actions'

function HashlessPasswords({ enabled }: { enabled: boolean }) {
  const [isLoading, setIsLoading] = useState(false);
  const [vulnerabilityEnabled, setVulnerabilityEnabled] = useState(enabled);

  const [password, setPassword] = useState("");
  const [recentlyStoredPassword, setRecentlyStoredPassword] = useState<string | null>(null);

  const handleXssSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true);
    await toggleUnsecureDataSaving(!enabled)
    window.location.reload()
  }
    
  const submitForm = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.closest('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true);

    if (password !== "") {
      const storedPassword = await storePassword(password)
      setRecentlyStoredPassword(storedPassword);
      setPassword("");
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Nesigurna pohrana osjetljivih podataka (Sensitive Data Exposure) - zaporke se pohranjuju nešifrirano u bazu podataka</h2>
      <form onSubmit={handleXssSubmit}>
        <input
          type="checkbox"
          id="toggle"
          disabled={isLoading}
          checked={vulnerabilityEnabled}
          onChange={(e) => setVulnerabilityEnabled(e.target.checked)}
          onClick={submitForm}
        />
        <label htmlFor="toggle" className="ml-2 text-xl">
          Ranjivost uključena
        </label>
      </form>

      <form onSubmit={handlePasswordSubmit}>
        <input 
          type="text"
          name="password"
          value={password}
          placeholder="Unesite lozinku"
          className="border border-gray-300 rounded px-2 py-2 mt-4 mr-2"
          disabled={isLoading}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
          type="submit"
          value={isLoading ? "Spremanje..." : "Spremi lozinku"}
          className="bg-blue-500 text-white rounded px-4 py-2 cursor-pointer disabled:opacity-50" 
          disabled={isLoading} 
        >
          {isLoading ? "Spremanje..." : "Spremi lozinku"}
        </button>
      </form>

      {recentlyStoredPassword && <span className="mt-2">Zadnje spremljena lozinka: {recentlyStoredPassword}</span>}
    </div>
  )
}

export default HashlessPasswords
