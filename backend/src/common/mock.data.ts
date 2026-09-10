import { SearchResult } from '../hanime/interfaces/search-result.interface';
import { Video } from '../hanime/interfaces/video.interface';
import { Stream } from '../hanime/interfaces/stream.interface';
import { HentaiSearchResult } from '../hentai-haven/interfaces/hentai-search-result.interface';
import { HentaiInfo } from '../hentai-haven/interfaces/hentai-info.interface';
import { HentaiSourcesResponse } from '../hentai-haven/interfaces/hentai-source.interface';
import { AutocompleteItem } from '../rule34/interfaces/autocomplete-item.interface';
import { PaginatedResult } from '../rule34/interfaces/paginated-result.interface';
import { ImageInfo } from '../rule34/interfaces/image-info.interface';

const VERIFIED_PLAYABLE_STREAMS = [
  { label: 'Servidor 1 (1080p Full HD MP4)', url: 'https://vjs.zencdn.net/v/oceans.mp4', mime: 'video/mp4' },
  { label: 'Servidor 2 (720p HD MP4)', url: 'https://media.w3.org/2010/05/sintel/trailer.mp4', mime: 'video/mp4' },
  { label: 'Servidor 3 (HLS Stream)', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', mime: 'application/x-mpegURL' }
];

const HANIME_FULL_CATALOG: SearchResult[] = [
  {
    id: 101,
    name: 'Overflow',
    slug: 'overflow',
    titles: ['Overflow', 'おーばーふろぉ'],
    description: 'Kazushi Sudou es un estudiante universitario que recibe la visita de sus dos amigas de la infancia, las hermanas Shirakawa, desencadenando divertidas y apasionadas situaciones.',
    views: 1240000,
    bannerImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80',
    brand: { name: 'Studio Hokiboshi', id: 1 },
    durationMs: 1200000,
    isCensored: false,
    likes: 45000,
    rating: 4.9,
    dislikes: 320,
    downloads: 380000,
    rankMonthly: 1,
    tags: ['Romance', 'Amigas de la Infancia', 'Escolar', 'Sin Censura', 'Ecchi'],
    createdAt: 1700000000000,
    releasedAt: 1700000000000
  },
  {
    id: 102,
    name: 'Mankitsu Happening',
    slug: 'mankitsu-happening',
    titles: ['Mankitsu Happening', 'まんきつハプニング'],
    description: 'Rei es un estudiante universitario que trabaja a tiempo parcial en un café manga (mankitsu) donde conoce a fascinantes clientas en situaciones inesperadas.',
    views: 980000,
    bannerImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&auto=format&fit=crop&q=80',
    brand: { name: 'Porno Saki', id: 2 },
    durationMs: 1800000,
    isCensored: true,
    likes: 39000,
    rating: 4.8,
    dislikes: 210,
    downloads: 290000,
    rankMonthly: 2,
    tags: ['Manga Café', 'Romance', 'Comedia', 'Harem'],
    createdAt: 1700000000000,
    releasedAt: 1700000000000
  },
  {
    id: 103,
    name: 'Kuroinu: Kedakaki Seishou wa Ore ni Somaru',
    slug: 'kuroinu',
    titles: ['Kuroinu', '黒犬'],
    description: 'En el continente fantástico de Eos, la Alianza de los Siete Reyes se enfrenta a la invasión de mercenarios Kuroinu en una batalla épica por el reino.',
    views: 1450000,
    bannerImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80',
    brand: { name: 'Seven', id: 3 },
    durationMs: 1650000,
    isCensored: false,
    likes: 52000,
    rating: 4.9,
    dislikes: 410,
    downloads: 410000,
    rankMonthly: 3,
    tags: ['Fantasía', 'Elfas', 'Magia', 'Acción', 'Oscuro'],
    createdAt: 1700000000000,
    releasedAt: 1700000000000
  },
  {
    id: 104,
    name: 'Master Piece',
    slug: 'master-piece',
    titles: ['Master Piece', 'マスターピース'],
    description: 'Historia centrada en la vida universitaria y romántica de un grupo de jóvenes con animación detallada y escenas pasionales.',
    views: 870000,
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80',
    brand: { name: 'T-Rex', id: 4 },
    durationMs: 1500000,
    isCensored: false,
    likes: 31000,
    rating: 4.7,
    dislikes: 180,
    downloads: 240000,
    rankMonthly: 4,
    tags: ['Romance', 'Alta Calidad', 'Universitarios'],
    createdAt: 1700000000000,
    releasedAt: 1700000000000
  },
  {
    id: 105,
    name: 'Isekai Harem Monogatari',
    slug: 'isekai-harem-monogatari',
    titles: ['Isekai Harem Monogatari', '異世界ハーレム物語'],
    description: 'Un joven es transportado a un mundo paralelo lleno de magia y aventuras, donde forma un clan con valientes guerreras y hechiceras.',
    views: 1120000,
    bannerImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&auto=format&fit=crop&q=80',
    brand: { name: 'Passione', id: 5 },
    durationMs: 1750000,
    isCensored: false,
    likes: 42000,
    rating: 4.9,
    dislikes: 190,
    downloads: 330000,
    rankMonthly: 5,
    tags: ['Isekai', 'Fantasía', 'Harem', 'Magia'],
    createdAt: 1700000000000,
    releasedAt: 1700000000000
  }
];

const HH_FULL_CATALOG: HentaiSearchResult[] = [
  {
    id: 'hh-1',
    title: 'Gakuen de Jikan wo Tomeru',
    cover: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=80',
    rating: 4.9,
    released: 2024,
    genres: [{ id: 'g1', url: '/genre/school', name: 'Escolar' }, { id: 'g2', url: '/genre/supernatural', name: 'Sobrenatural' }],
    totalEpisodes: 4,
    alternative: 'Time Stop Academy',
    author: 'PoRO'
  },
  {
    id: 'hh-2',
    title: 'Shoujo Ramune',
    cover: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80',
    rating: 4.8,
    released: 2023,
    genres: [{ id: 'g3', url: '/genre/romance', name: 'Romance' }, { id: 'g4', url: '/genre/slice-of-life', name: 'Vida Cotidiana' }],
    totalEpisodes: 4,
    alternative: 'Ramune Girls',
    author: 'Pashmina'
  },
  {
    id: 'hh-3',
    title: 'Imouto Bitch ni Shiborariai',
    cover: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80',
    rating: 4.7,
    released: 2024,
    genres: [{ id: 'g5', url: '/genre/comedy', name: 'Comedia' }, { id: 'g6', url: '/genre/romance', name: 'Romance' }],
    totalEpisodes: 2,
    alternative: 'Imouto Bitch',
    author: 'T-Rex'
  }
];

export const MOCK = {
  hanimeSearch: HANIME_FULL_CATALOG,
  hanimeDetail: {
    title: 'Overflow',
    slug: 'overflow',
    id: 101,
    description: 'Kazushi Sudou es un estudiante universitario que recibe la visita de sus dos amigas de la infancia, las hermanas Shirakawa, desencadenando divertidas y apasionadas situaciones.',
    views: 1240000,
    posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    brand: { name: 'Studio Hokiboshi', id: 1 },
    durationMs: 1200000,
    isCensored: false,
    likes: 45000,
    rating: 4.9,
    tags: [{ id: 1, text: 'Romance' }, { id: 2, text: 'Amigas de la Infancia' }, { id: 3, text: 'Escolar' }, { id: 4, text: 'Sin Censura' }],
    episodes: {
      next: null,
      all: [
        { id: 1, slug: 'ep-1', number: 1, season: 1, name: 'Episodio 1: Amigas de la Infancia', description: 'Primer episodio.', durationMs: 1200000, isCensored: false, isSubbed: true, isDubbed: false, thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&fit=crop', releasedAt: 1700000000000 },
        { id: 2, slug: 'ep-2', number: 2, season: 1, name: 'Episodio 2: Noche Inesperada', description: 'Segundo episodio.', durationMs: 1200000, isCensored: false, isSubbed: true, isDubbed: false, thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&fit=crop', releasedAt: 1700000000000 }
      ],
      random: null
    }
  } as Video,
  hanimeStreams: VERIFIED_PLAYABLE_STREAMS.map((s, i) => ({
    id: i + 1,
    serverId: i + 1,
    kind: s.mime.includes('mpeg') ? 'hls' : 'mp4',
    extension: s.mime.includes('mpeg') ? 'm3u8' : 'mp4',
    mimeType: s.mime,
    width: 1920,
    height: 1080,
    durationInMs: 1200000,
    filesizeMbs: 450,
    filename: s.label,
    url: s.url
  })) as Stream[],
  hhSearch: HH_FULL_CATALOG,
  hhDetail: {
    id: 'hh-1',
    title: 'Gakuen de Jikan wo Tomeru',
    cover: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=80',
    summary: 'En una academia aparentemente normal, el protagonista descubre un misterioso objeto capaz de detener el tiempo.',
    views: 890000,
    ratingCount: 5400,
    released: 2024,
    genres: [{ id: 'g1', url: '/genre/school', name: 'Escolar' }, { id: 'g2', url: '/genre/supernatural', name: 'Sobrenatural' }],
    totalEpisodes: 4,
    episodes: [
      { id: 'ep-1', title: 'Episodio 1: El Poder del Tiempo', thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&fit=crop', number: 1, releasedUTC: '2024-01-01T00:00:00Z', releasedRelative: 'Reciente' }
    ]
  } as HentaiInfo,
  hhSources: {
    sources: VERIFIED_PLAYABLE_STREAMS.map(s => ({
      label: s.label,
      src: s.url,
      type: s.mime
    }))
  } as HentaiSourcesResponse,
  r34Autocomplete: [
    { label: 'hentai', value: 'hentai', count: 125000 },
    { label: 'catgirl', value: 'catgirl', count: 45000 },
    { label: 'anime', value: 'anime', count: 98000 }
  ] as AutocompleteItem[],
  r34Search: {
    results: [
      { id: 'img-101', image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&fit=crop', tags: ['anime', 'hentai', 'illustration'], type: 'preview' }
    ],
    total: 1,
    page: 1,
    pages: 1,
    next: 1,
    previous: 1,
    hasNextPage: false
  } as PaginatedResult,
  r34Detail: {
    id: 'img-101',
    fullImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=1200&fit=crop',
    resizedImageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&fit=crop',
    tags: ['anime', 'hentai', 'illustration'],
    createdAt: 1700000000000,
    publishedBy: 'anime_artist',
    rating: 'safe',
    sizes: { original: { aspect: '16:9', width: 1920, height: 1080 } },
    comments: []
  } as ImageInfo
};
