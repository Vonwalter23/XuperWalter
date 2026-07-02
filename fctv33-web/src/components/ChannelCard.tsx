import { useState } from 'react'
import { Channel, useAppStore } from '../services/store'
import { FiPlay, FiHeart, FiMoreVertical } from 'react-icons/fi'

interface ChannelCardProps {
  channel: Channel
}

export default function ChannelCard({ channel }: ChannelCardProps) {
  const { setSelectedChannel, selectedChannel } = useAppStore()
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  const isSelected = selectedChannel?.id === channel.id

  return (
    <div
      className={`
        channel-card relative bg-dark-300 rounded-2xl overflow-hidden cursor-pointer
        border-2 transition-all duration-200
        ${isSelected ? 'border-primary-500 ring-2 ring-primary-500/30' : 'border-transparent hover:border-dark-100'}
      `}
      onClick={() => setSelectedChannel(channel)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo del canal */}
      <div className="relative aspect-video bg-dark-400 flex items-center justify-center p-4">
        {!imageError ? (
          <img
            src={channel.logo}
            alt={channel.name}
            className="max-w-full max-h-full object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-primary-500/20 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-400">
              {channel.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Indicador en vivo */}
        {channel.isLive && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-red-500 rounded-full text-xs font-semibold text-white">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            LIVE
          </div>
        )}

        {/* Overlay con botón de reproducir */}
        <div className={`
          absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-200
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          <button className="p-4 bg-primary-500 rounded-full shadow-lg transform transition-transform hover:scale-110">
            <FiPlay className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>

      {/* Info del canal */}
      <div className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">{channel.name}</h3>
            <p className="text-xs text-gray-400 capitalize">{channel.category}</p>
          </div>
          
          {/* Acciones */}
          <div className="flex items-center gap-1">
            <button 
              className="p-2 rounded-lg hover:bg-dark-100 text-gray-400 hover:text-red-400 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                // Toggle favorite
              }}
            >
              <FiHeart className="w-4 h-4" />
            </button>
            <button 
              className="p-2 rounded-lg hover:bg-dark-100 text-gray-400 hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                // Show options
              }}
            >
              <FiMoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Barra de progreso (si está seleccionado) */}
      {isSelected && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-dark-400">
          <div className="h-full bg-primary-500 w-1/3 animate-pulse" />
        </div>
      )}
    </div>
  )
}
