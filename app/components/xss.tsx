"use client"
import { toggleXSS } from "../actions"

export default function XSS({ enabled }: { enabled: boolean }) {
  const handleXssSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await toggleXSS(!enabled)
    window.location.reload()
  }
  
  const submitForm = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.closest('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
  }
  
  return (
      <div>
        <h1 className="text-4xl font-bold">Cross-site scripting (XSS) - krađa tokena unutar kolačića</h1>
        <form onSubmit={handleXssSubmit}>
          <input type="checkbox" id="toggle" className="peer hidden" onClick={(e) => submitForm(e)} />
        </form>
      </div>
  )
}
