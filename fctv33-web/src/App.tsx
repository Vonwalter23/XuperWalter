import { useEffect } from 'react'
import { useAppStore } from './services/store'
import { sampleChannels } from './services/data'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import VideoPlayer from './components/VideoPlayer'
import ChannelGrid from './components/ChannelGrid'
import { FiMenu } from 'react-icons/fi'

function App() {
  const { setChannels, setIsLoading, selectedChannel, showSidebar, toggleSidebar } = useAppStore()

  // Cargar canales al iniciar
  useEffect(() => {
    const loadChannels = async () => {
      setIsLoading(true)
      
      // Simular carga de datos
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Cargar canales de ejemplo (reemplazar con API real)
      setChannels(sampleChannels.map(ch => ({ ...ch, isLive: true })))
      setIsLoading(false)
    }
    
    loadChannels()
  }, [setChannels, setIsLoading])

  return (
    <div className="min-h-screen bg-dark-400">
      {/* Header */}
      <Header />
      
      {/* Contenido principal */}
      <div className="flex">
        {/* Sidebar */}
        {!showSidebar && (
          <button
            onClick={toggleSidebar}
            className="fixed left-4 bottom-4 z-40 p-3 bg-primary-500 rounded-full shadow-lg lg:hidden hover:bg-primary-600 transition-colors"
          >
            <FiMenu className="w-6 h-6 text-white" />
          </button>
        )}
        
        <Sidebar isMobile onClose={() => toggleSidebar()} />
        
        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Video Player */}
          <div className="p-4">
            <VideoPlayer />
          </div>
          
          {/* Channel Grid */}
          <div className="border-t border-dark-100">
            <div className="px-4 py-3">
              <h2 className="text-lg font-semibold text-white">
                {selectedChannel ? `Canales Similares` : 'Todos los Canales'}
              </h2>
              <p className="text-sm text-gray-400">
                {selectedChannel 
                  ? `Canales en la categoría ${selectedChannel.category}`
                  : 'Explora todos los canales disponibles'}
              </p>
            </div>
            <ChannelGrid />
          </div>
        </main>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-dark-100 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">FC</span>
            </div>
            <span className="text-gray-400 text-sm">FCTV33 © 2024</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
