export default function Navbar() {
  return (
    <header className="bg-gray-900 px-6 py-4 shadow-lg flex items-center justify-between border-b border-gray-800">
      <h1 className="text-xl font-bold text-cyber">CyberSec Hack Lab</h1>
      <nav className="space-x-6 text-sm">
        <a href="/" className="hover:text-cyber">Dashboard</a>
        <a href="/xss" className="hover:text-cyber">XSS Challenge</a>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cyber">GitHub</a>
      </nav>
    </header>
  )
}
