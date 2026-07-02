import { useAppStore } from '../services/store'
import { categories } from '../services/data'
import { FiX } from 'react-icons/fi'

interface SidebarProps {
  isMobile?: boolean
  onClose?: () => void
}

export default function Sidebar({ isMobile = false, onClose }: SidebarProps) {
  const { activeCategory, setActiveCategory, showSidebar } = useAppStore()

  if (isMobile && !showSidebar) return null

  return (
    <aside className={`
      ${isMobile ? 'fixed inset-0 z-50 bg-dark-400/95 backdrop-blur-md' : 'hidden lg:block sticky top-[60px] h-[calc(100vh-60px)]'}
      w-64 border-r border-dark-100 overflow-y-auto
    `}>
      {isMobile && (
        <div className="p-4 flex items-center justify-between border-b border-dark-100">
          <h2 className="font-semibold text-white">Categorías</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-dark-100">
            <FiX className="w-5 h-5" />
          </button>
        </div>
      )}
      
      <nav className="p-3">
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => {
                  setActiveCategory(cat.id)
                  if (isMobile && onClose) onClose()
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all
                  ${activeCategory === cat.id 
                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' 
                    : 'text-gray-300 hover:bg-dark-100 hover:text-white'}
                `}
              >
                <span className="text-xl">{cat.icon}</span>
                <span className="font-medium">{cat.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Quick links */}
      <div className="p-4 border-t border-dark-100">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Enlaces Rápidos
        </h3>
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors">
              📺 Canales Favoritos
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors">
              🕐 Vistos Recientemente
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors">
              ⚙️ Configuración
            </a>
          </li>
        </ul>
      </div>
    </aside>
  )
}
