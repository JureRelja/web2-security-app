export default function XSS() {
  return (
     <div>
        <h1 className="text-4xl font-bold">Cross-site scripting (XSS) - krađa tokena unutar kolačića</h1>
        <input type="checkbox" id="toggle" className="peer hidden" />
      </div>
  )
}
