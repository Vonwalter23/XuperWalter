import { useAppStore } from '../services/store'
import ChannelCard from './ChannelCard'

export default function ChannelGrid() {
  const { filteredChannels, isLoading } = useAppStore()

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="bg-dark-300 rounded-2xl overflow-hidden">
            <div className="aspect-video skeleton" />
            <div className="p-3 space-y-2">
              <div className="h-4 w-2/3 skeleton rounded" />
              <div className="h-3 w-1/3 skeleton rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (filteredChannels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-dark-300 flex items-center justify-center mb-4">
          <span className="text-4xl">🔍</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No se encontraron canales</h3>
        <p className="text-gray-400">Intenta con otro término de búsqueda</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
      {filteredChannels.map((channel) => (
        <ChannelCard key={channel.id} channel={channel} />
      ))}
    </div>
  )
}
