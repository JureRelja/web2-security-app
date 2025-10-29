"use client"

import { useState } from 'react';
import { toggleUnsecureDataSaving } from '../actions'

function HashlessPasswords({ enabled }: { enabled: boolean }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleXssSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true);
    await toggleUnsecureDataSaving(!enabled)
    window.location.reload()
  }
    
  const submitForm = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.closest('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Hashless Passwords - krađa tokena unutar kolačića</h1>
      <form onSubmit={handleXssSubmit}>
        <input type="checkbox" id="toggle" checked={enabled} onClick={(e) => submitForm(e)} disabled={isLoading} />
        <label htmlFor="toggle" className="ml-2 text-xl">
          Ranjivost uključena
        </label>
      </form>
    </div>
  )
}

export default HashlessPasswords
