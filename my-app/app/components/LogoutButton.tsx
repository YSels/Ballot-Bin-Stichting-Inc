'use client'

import { useRouter, usePathname } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  const pathname = usePathname()

  // Toon logout button niet op login pagina
  if (pathname === '/login') {
    return null
  }

  const handleLogout = async () => {
    try {
      // Optioneel: stuur logout request naar backend
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }).catch(() => {
        // Als logout endpoint niet bestaat, ga verder
      })

      // Stuur naar login pagina
      router.push('/login')
      router.refresh()
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <div className="fixed top-7 right-6 z-50">
      <button
        onClick={handleLogout}
        className="text-sm text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
      >
        Uitloggen
      </button>
    </div>
  )
}
