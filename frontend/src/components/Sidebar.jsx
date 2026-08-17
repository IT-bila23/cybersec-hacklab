export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 p-6 border-r border-gray-700 hidden md:block">
      <h2 className="text-lg font-bold mb-6">Challenges</h2>
      <ul className="space-y-3">
        <li><a href="/xss" className="hover:text-cyber">XSS Challenge</a></li>
        <li className="text-gray-500">SQLi (coming soon)</li>
        <li className="text-gray-500">Login Exploit (coming soon)</li>
        <li className="text-gray-500">Password Strength (coming soon)</li>
        <li className="text-gray-500">Network Map (coming soon)</li>
      </ul>
    </aside>
  )
}
