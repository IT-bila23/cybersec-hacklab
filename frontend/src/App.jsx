import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import Sidebar from "./components/Sidebar.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import XSSChallenge from "./pages/XSSChallenge.jsx"

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/xss" element={<XSSChallenge />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
