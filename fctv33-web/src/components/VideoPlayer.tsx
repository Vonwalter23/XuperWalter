import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import { useAppStore } from '../services/store'
import { 
  FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize, 
  FiMinimize, FiSettings, FiRotateCcw
} from 'react-icons/fi'

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { selectedChannel, isPlaying, setIsPlaying, isFullscreen, setIsFullscreen, volume, setVolume } = useAppStore()
  
  const [showControls, setShowControls] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [quality, setQuality] = useState<'auto' | '1080' | '720' | '480'>('auto')
  const [showQualityMenu, setShowQualityMenu] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Inicializar HLS
  useEffect(() => {
    if (!videoRef.current || !selectedChannel) return

    const video = videoRef.current
    const url = selectedChannel.url

    // Limpiar instancia anterior
    if (hlsRef.current) {
      hlsRef.current.destroy()
      hlsRef.current = null
    }

    setError(null)
    setIsBuffering(true)

    if (Hls.isSupported() && url.includes('.m3u8')) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      })
      
      hls.loadSource(url)
      hls.attachMedia(video)
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsBuffering(false)
        if (isPlaying) video.play()
      })
      
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          setError('Error al cargar el video')
          setIsBuffering(false)
        }
      })
      
      hlsRef.current = hls
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari native HLS support
      video.src = url
    } else {
      // Fallback para video directo
      video.src = url
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy()
      }
    }
  }, [selectedChannel])

  // Control de reproducción
  useEffect(() => {
    if (!videoRef.current) return
    
    if (isPlaying) {
      videoRef.current.play().catch(() => {})
    } else {
      videoRef.current.pause()
    }
  }, [isPlaying])

  // Control de volumen
  useEffect(() => {
    if (!videoRef.current) return
    videoRef.current.volume = volume
    videoRef.current.muted = isMuted
  }, [volume, isMuted])

  // Controles del mouse
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    
    const handleMouseMove = () => {
      setShowControls(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        if (isPlaying) setShowControls(false)
      }, 3000)
    }

    const container = containerRef.current
    container?.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      container?.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timeout)
    }
  }, [isPlaying])

  // Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!videoRef.current) return
      
      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault()
          setIsPlaying(!isPlaying)
          break
        case 'm':
          setIsMuted(!isMuted)
          break
        case 'f':
          toggleFullscreen()
          break
        case 'ArrowUp':
          setVolume(volume + 0.1)
          break
        case 'ArrowDown':
          setVolume(volume - 0.1)
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying, isMuted, volume])

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!selectedChannel) {
    return (
      <div className="aspect-video bg-dark-300 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-dark-100 flex items-center justify-center">
            <span className="text-4xl">📺</span>
          </div>
          <p className="text-gray-400">Selecciona un canal para reproducir</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className="relative aspect-video bg-black rounded-2xl overflow-hidden group"
      onDoubleClick={toggleFullscreen}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-full"
        onClick={() => setIsPlaying(!isPlaying)}
        onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
        onWaiting={() => setIsBuffering(true)}
        onCanPlay={() => setIsBuffering(false)}
        playsInline
      />

      {/* Buffering indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="text-center">
            <p className="text-red-400 mb-2">{error}</p>
            <button 
              onClick={() => {
                setError(null)
                videoRef.current?.load()
              }}
              className="px-4 py-2 bg-primary-500 rounded-lg text-white"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      {/* Channel info overlay */}
      <div className={`absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={selectedChannel.logo} 
              alt={selectedChannel.name}
              className="w-10 h-10 rounded-lg object-contain bg-white/10"
            />
            <div>
              <h3 className="font-semibold text-white">{selectedChannel.name}</h3>
              <p className="text-xs text-primary-400">EN VIVO</p>
            </div>
          </div>
          
          {selectedChannel.isLive && (
            <div className="flex items-center gap-1 px-3 py-1 bg-red-500 rounded-full">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-white">LIVE</span>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent transition-all duration-300 ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Progress bar */}
        <div className="mb-3 group/progress">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer group-hover/progress:h-2 transition-all">
            <div 
              className="h-full bg-primary-500 rounded-full"
              style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
            />
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Play/Pause */}
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
            >
              {isPlaying ? <FiPause className="w-6 h-6" /> : <FiPlay className="w-6 h-6" />}
            </button>

            {/* Volume */}
            <div 
              className="relative"
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
            >
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
              >
                {isMuted || volume === 0 ? <FiVolumeX className="w-5 h-5" /> : <FiVolume2 className="w-5 h-5" />}
              </button>
              
              {showVolumeSlider && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-dark-400 rounded-lg shadow-xl">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20 h-1 accent-primary-500"
                  />
                </div>
              )}
            </div>

            {/* Time */}
            <span className="text-sm text-white/80">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Restart */}
            <button className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors">
              <FiRotateCcw className="w-5 h-5" />
            </button>

            {/* Quality */}
            <div className="relative">
              <button 
                onClick={() => setShowQualityMenu(!showQualityMenu)}
                className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
              >
                <FiSettings className="w-5 h-5" />
              </button>
              
              {showQualityMenu && (
                <div className="absolute bottom-full right-0 mb-2 py-2 bg-dark-400 rounded-lg shadow-xl min-w-[120px]">
                  {(['auto', '1080', '720', '480'] as const).map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setQuality(q)
                        setShowQualityMenu(false)
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-white/10 transition-colors ${quality === q ? 'text-primary-400' : 'text-white'}`}
                    >
                      {q === 'auto' ? 'Auto' : `${q}p`}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen */}
            <button 
              onClick={toggleFullscreen}
              className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
            >
              {isFullscreen ? <FiMinimize className="w-5 h-5" /> : <FiMaximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
