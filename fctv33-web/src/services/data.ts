import { Channel, Category } from './store'

export const categories: Category[] = [
  { id: 'all', name: 'Todos', icon: '📺' },
  { id: 'sports', name: 'Deportes', icon: '⚽' },
  { id: 'news', name: 'Noticias', icon: '📰' },
  { id: 'entertainment', name: 'Entretenimiento', icon: '🎬' },
  { id: 'kids', name: 'Infantil', icon: '🧸' },
  { id: 'movies', name: 'Cine', icon: '🎥' },
  { id: 'music', name: 'Música', icon: '🎵' },
]

// Canales de ejemplo (reemplazar con datos reales de la API)
export const sampleChannels: Channel[] = [
  {
    id: '1',
    name: 'ESPN',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ESPN_wordmark.svg/200px-ESPN_wordmark.svg.png',
    category: 'sports',
    url: 'https://stream.espn.com/live',
  },
  {
    id: '2',
    name: 'Fox Sports',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Fox_Sports_Logo.svg/200px-Fox_Sports_Logo.svg.png',
    category: 'sports',
    url: 'https://stream.foxsports.com/live',
  },
  {
    id: '3',
    name: 'CNN',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/CNN_logo_-_2019.svg/200px-CNN_logo_-_2019.svg.png',
    category: 'news',
    url: 'https://stream.cnn.com/live',
  },
  {
    id: '4',
    name: 'MTV',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/MTV_Logo.svg/200px-MTV_Logo.svg.png',
    category: 'music',
    url: 'https://stream.mtv.com/live',
  },
  {
    id: '5',
    name: 'Disney Channel',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Disney_Channel_-_2019_Logo.svg/200px-Disney_Channel_-_2019_Logo.svg.png',
    category: 'kids',
    url: 'https://stream.disney.com/live',
  },
  {
    id: '6',
    name: 'HBO',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/HBO_logo_2018.svg/200px-HBO_logo_2018.svg.png',
    category: 'movies',
    url: 'https://stream.hbo.com/live',
  },
]
