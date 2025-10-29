"use client"

import { useState } from "react";
import { toggleXSS } from "../actions"

export default function XSS({ enabled }: { enabled: boolean }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleXssSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true);
    await toggleXSS(!enabled)
    window.location.reload()
  }
  
  const submitForm = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.closest('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
  }
  
  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Cross-site scripting (XSS) - krađa tokena unutar kolačića</h1>
      <form onSubmit={handleXssSubmit}>
        <input type="checkbox" id="toggle" checked={enabled} onClick={(e) => submitForm(e)} disabled={isLoading} />
        <label htmlFor="toggle" className="ml-2 text-xl">
          Ranjivost uključena
        </label>
      </form>
    </div>
  )
}
