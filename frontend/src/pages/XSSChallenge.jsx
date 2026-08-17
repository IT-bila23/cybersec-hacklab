import { useState } from "react"
import axios from "axios"

export default function XSSChallenge() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:5000/api/xss", { input })
      setResult(res.data)
    } catch (e) {
      setResult({ success: false, message: "Server error." })
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 p-6 bg-gray-800 rounded-2xl shadow">
        <h1 className="text-xl font-bold mb-4">XSS Challenge</h1>
        <p className="text-sm text-gray-300 mb-4">Try a payload that would trigger a reflected XSS in a vulnerable app (e.g. {"<script>alert(1)</script>"}). This lab is safe and simulated.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter payload..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="p-3 w-full bg-gray-900 border border-gray-700 rounded-lg"
          />
          <button type="submit" className="px-4 py-2 bg-cyber text-black font-semibold rounded-lg">Submit</button>
        </form>
        {result && (
          <div className={"mt-4 p-3 rounded-lg " + (result.success ? "bg-green-700" : "bg-red-700")}>
            {result.message} {result.flag && <span className="ml-2 font-bold">{result.flag}</span>}
          </div>
        )}
      </div>
      <div className="p-6 bg-gray-800 rounded-2xl shadow">
        <h2 className="font-semibold mb-2">How it works</h2>
        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
          <li>The backend checks if your payload contains {"<script>"}.</li>
          <li>On success, you get a demo flag and +50 score.</li>
          <li>All attempts are logged in the Dashboard.</li>
        </ul>
      </div>
    </div>
  )
}
