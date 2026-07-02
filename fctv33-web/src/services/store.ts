import { create } from 'zustand'

export interface Channel {
  id: string
  name: string
  logo: string
  category: string
  url: string
  isLive?: boolean
}

export interface Category {
  id: string
  name: string
  icon: string
}

interface AppState {
  // Channels
  channels: Channel[]
  filteredChannels: Channel[]
  selectedChannel: Channel | null
  activeCategory: string
  
  // Player
  isPlaying: boolean
  isFullscreen: boolean
  volume: number
  
  // UI
  isLoading: boolean
  searchQuery: string
  showSidebar: boolean
  
  // Actions
  setChannels: (channels: Channel[]) => void
  setSelectedChannel: (channel: Channel | null) => void
  setActiveCategory: (category: string) => void
  setSearchQuery: (query: string) => void
  setIsPlaying: (isPlaying: boolean) => void
  setIsFullscreen: (isFullscreen: boolean) => void
  setVolume: (volume: number) => void
  setIsLoading: (isLoading: boolean) => void
  toggleSidebar: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  channels: [],
  filteredChannels: [],
  selectedChannel: null,
  activeCategory: 'all',
  isPlaying: false,
  isFullscreen: false,
  volume: 1,
  isLoading: true,
  searchQuery: '',
  showSidebar: true,
  
  // Actions
  setChannels: (channels) => {
    set({ channels, filteredChannels: channels })
  },
  
  setSelectedChannel: (channel) => set({ selectedChannel: channel }),
  
  setActiveCategory: (category) => {
    const { channels, searchQuery } = get()
    const filtered = channels.filter(ch => {
      const matchesCategory = category === 'all' || ch.category === category
      const matchesSearch = searchQuery === '' || 
        ch.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
    set({ activeCategory: category, filteredChannels: filtered })
  },
  
  setSearchQuery: (query) => {
    const { channels, activeCategory } = get()
    const filtered = channels.filter(ch => {
      const matchesCategory = activeCategory === 'all' || ch.category === activeCategory
      const matchesSearch = query === '' || 
        ch.name.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesSearch
    })
    set({ searchQuery: query, filteredChannels: filtered })
  },
  
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setIsFullscreen: (isFullscreen) => set({ isFullscreen }),
  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
  setIsLoading: (isLoading) => set({ isLoading }),
  toggleSidebar: () => set((state) => ({ showSidebar: !state.showSidebar })),
}))
