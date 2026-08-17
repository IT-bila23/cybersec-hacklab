import { useEffect, useState } from "react"
import axios from "axios"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Dashboard() {
  const [data, setData] = useState({ logs: [], score: 0 })

  async function fetchLogs() {
    try {
      const res = await axios.get("http://localhost:5000/api/logs")
      setData(res.data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => { fetchLogs(); const id = setInterval(fetchLogs, 2000); return () => clearInterval(id); }, [])

  const counts = data.logs.reduce((acc, l) => {
    acc[l.type] = (acc[l.type] || 0) + 1
    return acc
  }, {})

  const chartData = {
    labels: Object.keys(counts),
    datasets: [
      { label: 'Attempts', data: Object.values(counts) }
    ]
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-800 rounded-2xl shadow">
          <div className="text-gray-300 text-sm">Score</div>
          <div className="text-3xl font-bold">{data.score}</div>
        </div>
        <div className="md:col-span-2 p-4 bg-gray-800 rounded-2xl shadow">
          <div className="text-gray-300 text-sm mb-2">Activity</div>
          <Bar data={chartData} />
        </div>
      </div>

      <div className="p-4 bg-gray-800 rounded-2xl shadow">
        <div className="text-lg font-semibold mb-3">Recent Logs</div>
        <div className="space-y-2 max-h-72 overflow-y-auto">
          {data.logs.map((l, idx) => (
            <div key={idx} className="flex justify-between text-sm bg-gray-900 p-2 rounded-lg">
              <span className="font-mono">{l.time}</span>
              <span className="uppercase">{l.type}</span>
              <span className={l.status === "SUCCESS" ? "text-green-400" : "text-red-400"}>{l.status}</span>
            </div>
          ))}
          {data.logs.length === 0 && <div className="text-gray-400">No logs yet. Try the XSS challenge.</div>}
        </div>
      </div>
    </div>
  )
}
