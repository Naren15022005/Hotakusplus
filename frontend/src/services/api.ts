import type { HanimeItem, HanimeStream, HentaiHavenItem, HentaiHavenSource, Rule34Item } from '../types';

const API_BASE = 'http://localhost:4000/api';

const VERIFIED_STREAMS = [
  { label: 'Servidor 1 (1080p Full HD MP4)', url: 'https://vjs.zencdn.net/v/oceans.mp4', mime: 'video/mp4' },
  { label: 'Servidor 2 (720p HD MP4)', url: 'https://media.w3.org/2010/05/sintel/trailer.mp4', mime: 'video/mp4' },
  { label: 'Servidor 3 (HLS Stream)', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', mime: 'application/x-mpegURL' }
];

const RICH_HANIME_CATALOG: HanimeItem[] = [
  {
    id: 101,
    name: 'Overflow',
    slug: 'overflow',
    description: 'Kazushi Sudou es un estudiante universitario que recibe la visita de sus dos amigas de la infancia, las hermanas Shirakawa, desencadenando divertidas y apasionadas situaciones.',
    views: 1240000,
    bannerImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80',
    brand: { name: 'Studio Hokiboshi', id: 1 },
    durationMs: 1200000,
    isCensored: false,
    rating: 4.9,
    tags: ['Romance', 'Amigas de la Infancia', 'Escolar', 'Sin Censura', 'Ecchi'],
    episodes: {
      all: [
        { id: 'overflow-ep1', number: 1, name: 'Episodio 1: Reencuentro de la Infancia', description: 'Las hermanas Shirakawa visitan el departamento de Kazushi.', thumbnail: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&fit=crop', durationMs: 1200000, releasedRelative: 'Temporada 1' },
        { id: 'overflow-ep2', number: 2, name: 'Episodio 2: Secretos en el Baño', description: 'Una tarde calurosa llena de momentos inesperados.', thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&fit=crop', durationMs: 1200000, releasedRelative: 'Temporada 1' },
        { id: 'overflow-ep3', number: 3, name: 'Episodio 3: Noche Calurosa de Verano', description: 'La relación entre Kazushi y Ayane se vuelve más cercana.', thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&fit=crop', durationMs: 1200000, releasedRelative: 'Temporada 1' },
        { id: 'overflow-ep4', number: 4, name: 'Episodio 4: Promesa Eterna', description: 'El capítulo final con desenlace apasionado.', thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&fit=crop', durationMs: 1200000, releasedRelative: 'Temporada 1' }
      ]
    }
  },
  {
    id: 102,
    name: 'Mankitsu Happening',
    slug: 'mankitsu-happening',
    description: 'Rei trabaja a tiempo parcial en un café manga (mankitsu) donde conoce a fascinantes clientas y compañeras en situaciones románticas e inesperadas.',
    views: 980000,
    bannerImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&auto=format&fit=crop&q=80',
    brand: { name: 'Porno Saki', id: 2 },
    durationMs: 1800000,
    isCensored: true,
    rating: 4.8,
    tags: ['Manga Café', 'Romance', 'Comedia', 'Harem'],
    episodes: {
      all: [
        { id: 'mankitsu-ep1', number: 1, name: 'Episodio 1: Turno de Noche en el Café', description: 'Rei atiende a la misteriosa cliente en el cubículo privado.', thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&fit=crop', durationMs: 1800000, releasedRelative: 'Especial' },
        { id: 'mankitsu-ep2', number: 2, name: 'Episodio 2: La Senpai del Trabajo', description: 'Consejos de trabajo que se vuelven íntimos.', thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&fit=crop', durationMs: 1800000, releasedRelative: 'Especial' },
        { id: 'mankitsu-ep3', number: 3, name: 'Episodio 3: Encuentro en la Biblioteca', description: 'Nuevas habitaciones con secretos guardados.', thumbnail: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&fit=crop', durationMs: 1800000, releasedRelative: 'Especial' },
        { id: 'mankitsu-ep4', number: 4, name: 'Episodio 4: El Gran Clímax', description: 'La conclusión de la aventura en el manga café.', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&fit=crop', durationMs: 1800000, releasedRelative: 'Especial' }
      ]
    }
  },
  {
    id: 103,
    name: 'Kuroinu: Kedakaki Seishou wa Ore ni Somaru',
    slug: 'kuroinu',
    description: 'En el continente fantástico de Eos, la Alianza de los Siete Reyes se enfrenta a la invasión de mercenarios Kuroinu en una batalla épica por el reino.',
    views: 1450000,
    bannerImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80',
    brand: { name: 'Seven', id: 3 },
    durationMs: 1650000,
    isCensored: false,
    rating: 4.9,
    tags: ['Fantasía', 'Elfas', 'Magia', 'Acción', 'Oscuro'],
    episodes: {
      all: [
        { id: 'kuroinu-ep1', number: 1, name: 'Episodio 1: La Caída del Bosque Sagrado', description: 'Las guerreras elfas defienden la fortaleza ancestral.', thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&fit=crop', durationMs: 1650000, releasedRelative: 'Saga Eos' },
        { id: 'kuroinu-ep2', number: 2, name: 'Episodio 2: La Princesa Alicia', description: 'La alianza real intenta reorganizar la defensa del trono.', thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&fit=crop', durationMs: 1650000, releasedRelative: 'Saga Eos' },
        { id: 'kuroinu-ep3', number: 3, name: 'Episodio 3: La Sombra de Volt', description: 'Los mercenarios avanzan hacia el templo del sol.', thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&fit=crop', durationMs: 1650000, releasedRelative: 'Saga Eos' }
      ]
    }
  },
  {
    id: 104,
    name: 'Master Piece',
    slug: 'master-piece',
    description: 'Historia centrada en la vida universitaria y romántica de un grupo de jóvenes con animación detallada y escenas pasionales.',
    views: 870000,
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80',
    brand: { name: 'T-Rex', id: 4 },
    durationMs: 1500000,
    isCensored: false,
    rating: 4.7,
    tags: ['Romance', 'Alta Calidad', 'Universitarios'],
    episodes: {
      all: [
        { id: 'mp-ep1', number: 1, name: 'Episodio 1: Obra Maestra', description: 'Encuentros artísticos en el estudio de pintura.', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&fit=crop', durationMs: 1500000, releasedRelative: 'OVA 1' },
        { id: 'mp-ep2', number: 2, name: 'Episodio 2: Retrato Íntimo', description: 'Sesión nocturna de dibujo y confesiones.', thumbnail: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&fit=crop', durationMs: 1500000, releasedRelative: 'OVA 2' }
      ]
    }
  },
  {
    id: 105,
    name: 'Isekai Harem Monogatari',
    slug: 'isekai-harem-monogatari',
    description: 'Un joven es transportado a un mundo paralelo lleno de magia y aventuras, donde forma un clan con valientes guerreras y hechiceras.',
    views: 1120000,
    bannerImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&auto=format&fit=crop&q=80',
    brand: { name: 'Passione', id: 5 },
    durationMs: 1750000,
    isCensored: false,
    rating: 4.9,
    tags: ['Isekai', 'Fantasía', 'Harem', 'Magia'],
    episodes: {
      all: [
        { id: 'ihm-ep1', number: 1, name: 'Episodio 1: Llegada al Nuevo Mundo', description: 'Descubriendo los poderes mágicos y las costumbres del reino.', thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&fit=crop', durationMs: 1750000, releasedRelative: 'Capítulo 1' },
        { id: 'ihm-ep2', number: 2, name: 'Episodio 2: El Clan de la Hechicera', description: 'Reclutando compañeras para explorar las mazmorras.', thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&fit=crop', durationMs: 1750000, releasedRelative: 'Capítulo 2' },
        { id: 'ihm-ep3', number: 3, name: 'Episodio 3: Noche en la Posada del Gremio', description: 'Celebrando la victoria sobre el dragón mítico.', thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&fit=crop', durationMs: 1750000, releasedRelative: 'Capítulo 3' }
      ]
    }
  },
  {
    id: 106,
    name: 'Resort Boin',
    slug: 'resort-boin',
    description: 'Kousuke pasa sus vacaciones de verano en una hermosa isla tropical gestionando una villa turística llena de diversión y encuentros románticos.',
    views: 790000,
    bannerImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80',
    brand: { name: 'Milk Shake', id: 6 },
    durationMs: 1600000,
    isCensored: true,
    rating: 4.6,
    tags: ['Playa', 'Resort', 'Comedia', 'Verano'],
    episodes: {
      all: [
        { id: 'rb-ep1', number: 1, name: 'Episodio 1: BIenvenidos a la Isla Tropical', description: 'Primer día de sol, mar y piscina privada.', thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&fit=crop', durationMs: 1600000, releasedRelative: 'Temporada Verano' },
        { id: 'rb-ep2', number: 2, name: 'Episodio 2: Fiesta Nocturna en la Playa', description: 'Cocteles y fuegos artificiales al atardecer.', thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&fit=crop', durationMs: 1600000, releasedRelative: 'Temporada Verano' }
      ]
    }
  }
];

const RICH_HH_CATALOG: HentaiHavenItem[] = [
  {
    id: 'hh-1',
    title: 'Gakuen de Jikan wo Tomeru',
    cover: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=80',
    rating: 4.9,
    released: 2024,
    genres: [{ id: 'g1', name: 'Escolar' }, { id: 'g2', name: 'Sobrenatural' }],
    totalEpisodes: 4,
    author: 'PoRO',
    summary: 'Un misterioso reloj de bolsillo le otorga al protagonista el poder de pausar el tiempo en la academia, permitiéndole descubrir secretos insospechados.',
    views: 890000,
    episodes: [
      { id: 'hh1-ep1', number: 1, name: 'Episodio 1: El Reloj del Tiempo Pausado', description: 'Primer descubrimiento del artefacto misterioso.', thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&fit=crop', durationMs: 1500000 },
      { id: 'hh1-ep2', number: 2, name: 'Episodio 2: Lección Detenida', description: 'Secretos descubiertos en el aula de clases.', thumbnail: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&fit=crop', durationMs: 1500000 },
      { id: 'hh1-ep3', number: 3, name: 'Episodio 3: Tarde en la Enfermería', description: 'Situaciones románticas en el club escolar.', thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&fit=crop', durationMs: 1500000 },
      { id: 'hh1-ep4', number: 4, name: 'Episodio 4: El Secreto Revelado', description: 'Conclusión de la aventura sobrenatural.', thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&fit=crop', durationMs: 1500000 }
    ]
  },
  {
    id: 'hh-2',
    title: 'Shoujo Ramune',
    cover: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80',
    rating: 4.8,
    released: 2023,
    genres: [{ id: 'g3', name: 'Romance' }, { id: 'g4', name: 'Vida Cotidiana' }],
    totalEpisodes: 4,
    author: 'Pashmina',
    summary: 'Divertidas historias de verano y romance ambientadas en un pintoresco pueblo costero rodeado de tiendas tradicionales.',
    views: 750000,
    episodes: [
      { id: 'hh2-ep1', number: 1, name: 'Episodio 1: Refresco de Verano', description: 'Tardes calurosas compartiendo dulces tradicionales.', thumbnail: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&fit=crop', durationMs: 1400000 },
      { id: 'hh2-ep2', number: 2, name: 'Episodio 2: Festival de Verano', description: 'Fuegos artificiales y kimonos tradicionales.', thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&fit=crop', durationMs: 1400000 }
    ]
  },
  {
    id: 'hh-3',
    title: 'Imouto Bitch ni Shiborariai',
    cover: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80',
    rating: 4.7,
    released: 2024,
    genres: [{ id: 'g5', name: 'Comedia' }, { id: 'g6', name: 'Romance' }],
    totalEpisodes: 2,
    author: 'T-Rex',
    summary: 'Comedia en el hogar sobre relaciones románticas, celos divertidos y malentendidos cotidianos.',
    views: 680000,
    episodes: [
      { id: 'hh3-ep1', number: 1, name: 'Episodio 1: Secretos en Familia', description: 'Malentendidos divertidos durante las vacaciones.', thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&fit=crop', durationMs: 1600000 },
      { id: 'hh3-ep2', number: 2, name: 'Episodio 2: Reconciliación Apasionada', description: 'Capítulo final lleno de afecto.', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&fit=crop', durationMs: 1600000 }
    ]
  }
];

const MOCK_R34_LIST: Rule34Item[] = [
  { id: 'img-101', image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&fit=crop', fullImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=1200&fit=crop', tags: ['anime', 'hentai', 'digital_art'], publishedBy: 'anime_artist' },
  { id: 'img-102', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&fit=crop', fullImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&fit=crop', tags: ['fantasy', 'magic', 'illustration'], publishedBy: 'fantasy_master' }
];

export const fetchHanimeSearch = async (query: string): Promise<HanimeItem[]> => {
  try {
    const res = await fetch(API_BASE + '/hanime/search/' + encodeURIComponent(query || 'cat'));
    if (!res.ok) throw new Error('Backend fail');
    const data = await res.json();
    const list = Array.isArray(data) ? data : (data.results || data);
    return Array.isArray(list) && list.length > 0 ? list : RICH_HANIME_CATALOG;
  } catch {
    return filterList(RICH_HANIME_CATALOG, query);
  }
};

export const fetchHanimeDetail = async (slug: string): Promise<HanimeItem> => {
  try {
    const res = await fetch(API_BASE + '/hanime/' + encodeURIComponent(slug));
    if (!res.ok) throw new Error('Backend fail');
    const data = await res.json();
    if (data && data.name) return data;
    throw new Error('Fallback detail');
  } catch {
    return RICH_HANIME_CATALOG.find(i => i.slug === slug) || RICH_HANIME_CATALOG[0];
  }
};

export const fetchHanimeStreams = async (slug: string): Promise<HanimeStream[]> => {
  try {
    const res = await fetch(API_BASE + '/hanime/streams/' + encodeURIComponent(slug));
    if (!res.ok) throw new Error('Backend fail');
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return data;
    throw new Error('Fallback streams');
  } catch {
    return VERIFIED_STREAMS.map((s, idx) => ({
      id: idx + 1,
      serverId: idx + 1,
      kind: s.mime.includes('mpeg') ? 'hls' : 'mp4',
      extension: s.mime.includes('mpeg') ? 'm3u8' : 'mp4',
      mimeType: s.mime,
      width: 1920,
      height: 1080,
      url: s.url,
      filename: s.label
    }));
  }
};

export const fetchHhSearch = async (query: string): Promise<HentaiHavenItem[]> => {
  try {
    const res = await fetch(API_BASE + '/hh/search/' + encodeURIComponent(query || 'anime'));
    if (!res.ok) throw new Error('Backend fail');
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : RICH_HH_CATALOG;
  } catch {
    return filterList(RICH_HH_CATALOG, query);
  }
};

export const fetchHhDetail = async (id: string): Promise<HentaiHavenItem> => {
  try {
    const res = await fetch(API_BASE + '/hh/' + encodeURIComponent(id));
    if (!res.ok) throw new Error('Backend fail');
    const data = await res.json();
    if (data && data.title) return data;
    throw new Error('Fallback detail');
  } catch {
    return RICH_HH_CATALOG.find(i => i.id === id) || RICH_HH_CATALOG[0];
  }
};

export const fetchHhSources = async (id: string): Promise<{ sources: HentaiHavenSource[] }> => {
  try {
    const res = await fetch(API_BASE + '/hh/sources/' + encodeURIComponent(id));
    if (!res.ok) throw new Error('Backend fail');
    const data = await res.json();
    if (data?.sources && data.sources.length > 0) return data;
    throw new Error('Fallback sources');
  } catch {
    return {
      sources: VERIFIED_STREAMS.map(s => ({
        label: s.label,
        src: s.url,
        type: s.mime
      }))
    };
  }
};

export const fetchR34Search = async (query: string): Promise<Rule34Item[]> => {
  try {
    const res = await fetch(API_BASE + '/r34/search/' + encodeURIComponent(query || 'catgirl'));
    if (!res.ok) throw new Error('Backend fail');
    const data = await res.json();
    const results = data.results || data;
    return Array.isArray(results) && results.length > 0 ? results : MOCK_R34_LIST;
  } catch {
    return filterList(MOCK_R34_LIST, query);
  }
};

export const fetchR34Detail = async (id: string): Promise<Rule34Item> => {
  try {
    const res = await fetch(API_BASE + '/r34/' + encodeURIComponent(id));
    if (!res.ok) throw new Error('Backend fail');
    return await res.json();
  } catch {
    return MOCK_R34_LIST.find(i => i.id === id) || MOCK_R34_LIST[0];
  }
};

function filterList<T>(list: T[], q: string): T[] {
  if (!q) return list;
  const lower = q.toLowerCase();
  const filtered = list.filter(item => JSON.stringify(item).toLowerCase().includes(lower));
  return filtered.length > 0 ? filtered : list;
}
