import { useState } from 'react'
import { useAppStore } from '../services/store'
import { FiMenu, FiSearch, FiX } from 'react-icons/fi'

export default function Header() {
  const { searchQuery, setSearchQuery, toggleSidebar } = useAppStore()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-dark-400/95 backdrop-blur-md border-b border-dark-100">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-dark-100 transition-colors lg:hidden"
            aria-label="Menú"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg glow">
              <span className="text-white font-bold text-lg">FC</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">FCTV33</h1>
              <p className="text-xs text-gray-400">TV en Vivo</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar canales..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-dark-300 border border-dark-100 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile search button */}
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="p-2 rounded-lg hover:bg-dark-100 transition-colors md:hidden"
        >
          <FiSearch className="w-5 h-5" />
        </button>

        {/* User info */}
        <div className="hidden sm:flex items-center gap-2 ml-4">
          <div className="text-right">
            <p className="text-sm font-medium text-white">Usuario</p>
            <p className="text-xs text-green-400">● Premium</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
            U
          </div>
        </div>
      </div>

      {/* Mobile search */}
      {isSearchOpen && (
        <div className="px-4 pb-3 md:hidden">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar canales..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-dark-300 border border-dark-100 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  )
}
