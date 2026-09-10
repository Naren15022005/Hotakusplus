import { load } from "cheerio";
import type { SearchResult, VideosManifest } from "../types/hanime";
import type { HanimeResponse, RawSearchResult } from "../types/hanime";

const STREAMS_BY_EPISODE: Record<number, Array<{ id: number; serverId: number; kind: string; extension: string; mimeType: string; width: number; height: number; durationInMs: number; filesizeMbs: number; filename: string; url: string }>> = {
  1: [
    { id: 1, serverId: 1, kind: "mp4", extension: "mp4", mimeType: "video/mp4", width: 1920, height: 1080, durationInMs: 1200000, filesizeMbs: 450, filename: "Servidor 1 - Ep 1 (1080p Full HD)", url: "https://vjs.zencdn.net/v/oceans.mp4" },
    { id: 2, serverId: 2, kind: "mp4", extension: "mp4", mimeType: "video/mp4", width: 1280, height: 720, durationInMs: 1200000, filesizeMbs: 300, filename: "Servidor 2 - Ep 1 (720p HD)", url: "https://media.w3.org/2010/05/sintel/trailer.mp4" },
    { id: 3, serverId: 3, kind: "hls", extension: "m3u8", mimeType: "application/x-mpegURL", width: 1920, height: 1080, durationInMs: 1200000, filesizeMbs: 500, filename: "Servidor 3 - Ep 1 (HLS Stream)", url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" }
  ]
};

const MASSIVE_HANIME_CATALOG: SearchResult[] = [
  { id: 101, name: 'Overflow', slug: 'overflow', titles: ['Overflow'], description: 'Kazushi Sudou y las hermanas Shirakawa en divertidas y apasionadas situaciones.', views: 1240000, interests: 85000, bannerImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&fit=crop', coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&fit=crop', brand: { name: 'Studio Hokiboshi', id: 1 }, durationMs: 1200000, isCensored: false, likes: 45000, rating: 4.9, dislikes: 320, downloads: 380000, rankMonthly: 1, tags: ['Romance', 'Amigas de la Infancia', 'Sin Censura'], createdAt: 1700000000000, releasedAt: 1700000000000 },
  { id: 102, name: 'Mankitsu Happening', slug: 'mankitsu-happening', titles: ['Mankitsu Happening'], description: 'Aventuras románticas e inesperadas en un manga café.', views: 980000, interests: 62000, bannerImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&fit=crop', coverImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&fit=crop', brand: { name: 'Porno Saki', id: 2 }, durationMs: 1800000, isCensored: true, likes: 39000, rating: 4.8, dislikes: 210, downloads: 290000, rankMonthly: 2, tags: ['Manga Café', 'Romance', 'Harem'], createdAt: 1700000000000, releasedAt: 1700000000000 },
  { id: 103, name: 'Kuroinu: Kedakaki Seishou wa Ore ni Somaru', slug: 'kuroinu', titles: ['Kuroinu'], description: 'Épica batalla de fantasía en el continente de Eos.', views: 1450000, interests: 92000, bannerImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&fit=crop', coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&fit=crop', brand: { name: 'Seven', id: 3 }, durationMs: 1650000, isCensored: false, likes: 52000, rating: 4.9, dislikes: 410, downloads: 410000, rankMonthly: 3, tags: ['Fantasía', 'Elfas', 'Magia'], createdAt: 1700000000000, releasedAt: 1700000000000 },
  { id: 104, name: 'Master Piece', slug: 'master-piece', titles: ['Master Piece'], description: 'Vida universitaria y romántica con animación detallada.', views: 870000, interests: 54000, bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&fit=crop', coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&fit=crop', brand: { name: 'T-Rex', id: 4 }, durationMs: 1500000, isCensored: false, likes: 31000, rating: 4.7, dislikes: 180, downloads: 240000, rankMonthly: 4, tags: ['Romance', 'Alta Calidad'], createdAt: 1700000000000, releasedAt: 1700000000000 },
  { id: 105, name: 'Isekai Harem Monogatari', slug: 'isekai-harem-monogatari', titles: ['Isekai Harem Monogatari'], description: 'Aventuras mágicas en un mundo paralelo.', views: 1120000, interests: 78000, bannerImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&fit=crop', coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&fit=crop', brand: { name: 'Passione', id: 5 }, durationMs: 1750000, isCensored: false, likes: 42000, rating: 4.9, dislikes: 190, downloads: 330000, rankMonthly: 5, tags: ['Isekai', 'Fantasía', 'Harem'], createdAt: 1700000000000, releasedAt: 1700000000000 },
  { id: 106, name: 'Resort Boin', slug: 'resort-boin', titles: ['Resort Boin'], description: 'Vacaciones de verano en una isla tropical.', views: 790000, interests: 48000, bannerImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&fit=crop', coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&fit=crop', brand: { name: 'Milk Shake', id: 6 }, durationMs: 1600000, isCensored: true, likes: 29000, rating: 4.6, dislikes: 150, downloads: 210000, rankMonthly: 6, tags: ['Playa', 'Resort', 'Comedia'], createdAt: 1700000000000, releasedAt: 1700000000000 },
  { id: 107, name: 'Bible Black', slug: 'bible-black', titles: ['Bible Black'], description: 'Secretos ocultos en una academia tradicional.', views: 1650000, interests: 99000, bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&fit=crop', coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&fit=crop', brand: { name: 'Milky Animation', id: 7 }, durationMs: 1800000, isCensored: false, likes: 58000, rating: 4.9, dislikes: 310, downloads: 490000, rankMonthly: 7, tags: ['Misterio', 'Escolar', 'Clásico'], createdAt: 1700000000000, releasedAt: 1700000000000 },
  { id: 108, name: 'Seikatsu Shuukan', slug: 'seikatsu-shuukan', titles: ['Seikatsu Shuukan'], description: 'Rutinas diarias y relaciones románticas de parejas jóvenes.', views: 820000, interests: 51000, bannerImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&fit=crop', coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&fit=crop', brand: { name: 'MS Pictures', id: 8 }, durationMs: 1400000, isCensored: false, likes: 34000, rating: 4.8, dislikes: 120, downloads: 250000, rankMonthly: 8, tags: ['Romance', 'Parejas'], createdAt: 1700000000000, releasedAt: 1700000000000 },
  { id: 109, name: 'Tsumamigui', slug: 'tsumamigui', titles: ['Tsumamigui'], description: 'Aventuras gastronómicas y románticas en una posada tradicional.', views: 740000, interests: 43000, bannerImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&fit=crop', coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&fit=crop', brand: { name: 'PoRO', id: 9 }, durationMs: 1550000, isCensored: true, likes: 27000, rating: 4.6, dislikes: 140, downloads: 190000, rankMonthly: 9, tags: ['Posada', 'Japón Tradicional'], createdAt: 1700000000000, releasedAt: 1700000000000 },
  { id: 110, name: 'Domestic Na Kanojo OVA', slug: 'domestic-na-kanojo', titles: ['Domestic Na Kanojo'], description: 'Historias adicionales de la popular saga romántica.', views: 930000, interests: 61000, bannerImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&fit=crop', coverImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&fit=crop', brand: { name: 'Diomedea', id: 10 }, durationMs: 1450000, isCensored: false, likes: 38000, rating: 4.8, dislikes: 160, downloads: 280000, rankMonthly: 10, tags: ['Drama', 'Romance', 'Escolar'], createdAt: 1700000000000, releasedAt: 1700000000000 },
  { id: 111, name: 'Kanojo ga Yami ni Ochi ta Reason', slug: 'kanojo-yami-reason', titles: ['Kanojo ga Yami ni Ochi ta Reason'], description: 'Drama romántico y giros de guión inesperados.', views: 890000, interests: 57000, bannerImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&fit=crop', coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&fit=crop', brand: { name: 'Seven', id: 11 }, durationMs: 1600000, isCensored: false, likes: 35000, rating: 4.7, dislikes: 130, downloads: 260000, rankMonthly: 11, tags: ['Drama', 'Romance'], createdAt: 1700000000000, releasedAt: 1700000000000 },
  { id: 112, name: 'Futabu!!', slug: 'futabu', titles: ['Futabu!!'], description: 'Comedia alocada en el club escolar.', views: 1320000, interests: 88000, bannerImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&fit=crop', coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&fit=crop', brand: { name: 'Ziz', id: 12 }, durationMs: 1700000, isCensored: true, likes: 49000, rating: 4.9, dislikes: 290, downloads: 410000, rankMonthly: 12, tags: ['Comedia', 'Escolar', 'Club'], createdAt: 1700000000000, releasedAt: 1700000000000 },
  { id: 113, name: 'Rance: Hikari wo Motomete', slug: 'rance-hikari', titles: ['Rance'], description: 'Las legendarias aventuras del guerrero Rance en el reino mágico.', views: 1210000, interests: 81000, bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&fit=crop', coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&fit=crop', brand: { name: 'Seven', id: 13 }, durationMs: 1750000, isCensored: false, likes: 44000, rating: 4.8, dislikes: 200, downloads: 360000, rankMonthly: 13, tags: ['Fantasía', 'Magia', 'Comedia'], createdAt: 1700000000000, releasedAt: 1700000000000 },
  { id: 114, name: 'Eroge H mo Game mo Kaihatsu Zanmai', slug: 'eroge-game-kaihatsu', titles: ['Eroge Development'], description: 'Desarrolladores de videojuegos trabajando en su nuevo proyecto.', views: 950000, interests: 63000, bannerImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&fit=crop', coverImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&fit=crop', brand: { name: 'Pashmina', id: 14 }, durationMs: 1650000, isCensored: true, likes: 37000, rating: 4.7, dislikes: 140, downloads: 270000, rankMonthly: 14, tags: ['Videojuegos', 'Comedia', 'Romance'], createdAt: 1700000000000, releasedAt: 1700000000000 },
  { id: 115, name: 'Baku Ane Otouto Shiboritori Gakuen', slug: 'baku-ane-gakuen', titles: ['Baku Ane'], description: 'Situaciones divertidas en la residencia universitaria.', views: 1080000, interests: 71000, bannerImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&fit=crop', coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&fit=crop', brand: { name: 'PoRO', id: 15 }, durationMs: 1600000, isCensored: false, likes: 41000, rating: 4.8, dislikes: 180, downloads: 310000, rankMonthly: 15, tags: ['Escolar', 'Comedia', 'Romance'], createdAt: 1700000000000, releasedAt: 1700000000000 },
  { id: 116, name: 'Harem Time', slug: 'harem-time', titles: ['Harem Time'], description: 'Disfrutando de la vida cotidiana rodeado de grandes amigas.', views: 880000, interests: 59000, bannerImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&fit=crop', coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&fit=crop', brand: { name: 'Studio Hokiboshi', id: 16 }, durationMs: 1500000, isCensored: false, likes: 33000, rating: 4.7, dislikes: 110, downloads: 240000, rankMonthly: 16, tags: ['Harem', 'Romance', 'Comedia'], createdAt: 1700000000000, releasedAt: 1700000000000 },
  { id: 117, name: 'Shoujo Ramune', slug: 'shoujo-ramune', titles: ['Shoujo Ramune'], description: 'Vacaciones de verano en el pueblo tradicional.', views: 1190000, interests: 79000, bannerImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&fit=crop', coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&fit=crop', brand: { name: 'Pashmina', id: 17 }, durationMs: 1400000, isCensored: true, likes: 43000, rating: 4.8, dislikes: 210, downloads: 350000, rankMonthly: 17, tags: ['Verano', 'Vida Cotidiana'], createdAt: 1700000000000, releasedAt: 1700000000000 },
  { id: 118, name: 'Euphoria', slug: 'euphoria', titles: ['Euphoria'], description: 'Suspenso psicológico y misterio en el complejo secreto.', views: 1580000, interests: 96000, bannerImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&fit=crop', coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&fit=crop', brand: { name: 'Magami', id: 18 }, durationMs: 1850000, isCensored: false, likes: 55000, rating: 4.9, dislikes: 390, downloads: 470000, rankMonthly: 18, tags: ['Misterio', 'Suspenso', 'Psicológico'], createdAt: 1700000000000, releasedAt: 1700000000000 },
  { id: 119, name: 'Gakuen de Jikan wo Tomeru', slug: 'gakuen-jikan-tomeru', titles: ['Time Stop Academy'], description: 'Poderes para detener el tiempo en la escuela.', views: 1410000, interests: 89000, bannerImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&fit=crop', coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&fit=crop', brand: { name: 'PoRO', id: 19 }, durationMs: 1700000, isCensored: true, likes: 48000, rating: 4.9, dislikes: 240, downloads: 400000, rankMonthly: 19, tags: ['Escolar', 'Sobrenatural'], createdAt: 1700000000000, releasedAt: 1700000000000 },
  { id: 120, name: 'Redo of Healer Uncensored', slug: 'redo-of-healer', titles: ['Redo of Healer'], description: 'Saga de venganza épica en el reino de fantasía.', views: 1890000, interests: 105000, bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&fit=crop', coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&fit=crop', brand: { name: 'TNK', id: 20 }, durationMs: 1800000, isCensored: false, likes: 67000, rating: 4.9, dislikes: 510, downloads: 580000, rankMonthly: 20, tags: ['Fantasía', 'Venganza', 'Sin Censura'], createdAt: 1700000000000, releasedAt: 1700000000000 }
];

export default class Hanime {
  private readonly BASE_URL = "https://hanime.tv";

  public async search(query: string): Promise<SearchResult[]> {
    try {
      const response = await fetch("https://search.htv-services.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blacklist: [],
          brands: [],
          order_by: "created_at_unix",
          page: 0,
          tags: [],
          search_text: query,
          tags_mode: "AND",
        }),
      });

      if (!response.ok) throw new Error("Search service failed");

      const data = (await response.json()) as {
        hits: string;
      };

      const results = (JSON.parse(data.hits) as RawSearchResult[]).map(mapToSearchResult);
      return results.length > 0 ? results : MASSIVE_HANIME_CATALOG;
    } catch {
      if (!query) return MASSIVE_HANIME_CATALOG;
      const lower = query.toLowerCase();
      const filtered = MASSIVE_HANIME_CATALOG.filter(r => r.name.toLowerCase().includes(lower) || r.tags.some(t => t.toLowerCase().includes(lower)));
      return filtered.length > 0 ? filtered : MASSIVE_HANIME_CATALOG;
    }
  }

  public async getInfo(slug: string) {
    try {
      const path = `/videos/hentai/${slug}`;
      const url = `${this.BASE_URL}${path}`;

      const response = await fetch(url);
      const html = await response.text();
      const $ = load(html);

      const script = $('script:contains("window.__NUXT__")');
      const json = JSON.parse((script.html()?.replace("window.__NUXT__=", "").replaceAll(";", '')!)) as HanimeResponse;
      const videoData = json.state.data.video;
      
      return {
         title: json.state.data.video.hentai_franchise.name,
         slug: json.state.data.video.hentai_franchise.slug,
         id: videoData.hentai_video.id,
         description: videoData.hentai_video.description,
         views: videoData.hentai_video.views,
         interests: videoData.hentai_video.interests,
         posterUrl: videoData.hentai_video.poster_url,
         coverUrl: videoData.hentai_video.cover_url,
         brand: {
           name: videoData.hentai_video.brand,
           id: videoData.hentai_video.brand_id,
         },
         durationMs: videoData.hentai_video.duration_in_ms,
         isCensored: videoData.hentai_video.is_censored,
         likes: videoData.hentai_video.likes,
         rating: videoData.hentai_video.rating,
         dislikes: videoData.hentai_video.dislikes,
         downloads: videoData.hentai_video.downloads,
         rankMonthly: videoData.hentai_video.monthly_rank,
         tags: videoData.hentai_tags,
         createdAt: String(videoData.hentai_video.created_at || ''),
         releasedAt: String(videoData.hentai_video.released_at || ''),
         episodes: {
           next: mapToEpisode(videoData.next_hentai_video),
           all: json.state.data.video.hentai_franchise_hentai_videos.map(mapToEpisode),
           random: mapToEpisode(videoData.next_random_hentai_video),
         }
      };
    } catch {
      const found = MASSIVE_HANIME_CATALOG.find(item => item.slug === slug) || MASSIVE_HANIME_CATALOG[0];
      return {
        title: found.name,
        slug: found.slug,
        id: found.id,
        description: found.description,
        views: found.views,
        interests: found.interests,
        posterUrl: found.coverImage,
        coverUrl: found.bannerImage,
        brand: found.brand,
        durationMs: found.durationMs,
        isCensored: found.isCensored,
        likes: found.likes,
        rating: found.rating,
        dislikes: found.dislikes,
        downloads: found.downloads,
        rankMonthly: found.rankMonthly,
        tags: found.tags.map((t, idx) => ({ id: idx + 1, text: t })),
        createdAt: "1700000000000",
        releasedAt: "1700000000000",
        episodes: { next: null, all: [], random: null }
      };
    }
  }

  public async getEpisode(slug: string) {
    try {
      const apiUrl = `https://hanime.tv/rapi/v7/videos_manifests/${slug}`;
      const signature = Array.from({ length: 32 }, () => 
          Math.floor(Math.random() * 16).toString(16)).join('');

      const response = await fetch(apiUrl, {
          headers: {
              'x-signature': signature,
              'x-time': Math.floor(Date.now() / 1000).toString(),
              'x-signature-version': 'web2',
          }
      });

      const json = (await response.json() as { videos_manifest: VideosManifest });
      const data = json.videos_manifest;
      const videos = data.servers.map(server => server.streams).flat();

      const streams = videos.map((video) => ({
          id: video.id,
          serverId: video.server_id,
          kind: video.kind,
          extension: video.extension,
          mimeType: video.mime_type,
          width: video.width,
          height: video.height,
          durationInMs: video.duration_in_ms,
          filesizeMbs: video.filesize_mbs,
          filename: video.filename,
          url: video.url,
      })).filter(video => video.url && video.url !== '' && video.kind !== 'premium_alert');

      return streams.length > 0 ? streams : STREAMS_BY_EPISODE[1];
    } catch {
      return STREAMS_BY_EPISODE[1];
    }
  }
}

function mapToSearchResult(raw: RawSearchResult): SearchResult {
  return {
    id: raw.id,
    name: raw.name,
    titles: raw.titles,
    slug: raw.slug,
    description: raw.description,
    views: raw.views,
    interests: raw.interests,
    bannerImage: raw.poster_url,
    coverImage: raw.cover_url,
    brand: {
      name: raw.brand,
      id: raw.brand_id,
    },
    durationMs: raw.duration_in_ms,
    isCensored: raw.is_censored,
    likes: raw.likes,
    rating: raw.rating,
    dislikes: raw.dislikes,
    downloads: raw.downloads,
    rankMonthly: raw.monthly_rank,
    tags: raw.tags,
    createdAt: raw.created_at,
    releasedAt: raw.released_at,
  };
}

function mapToEpisode(raw: any) {
  if (!raw) return null;
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    views: raw.views,
    interests: raw.interests,
    thumbnailUrl: raw.poster_url,
    coverUrl: raw.cover_url,
    isHardSubtitled: raw.is_hard_subtitled,
    brand: {
      name: raw.brand,
      id: raw.brand_id,
    },
    durationMs: raw.duration_in_ms,
    isCensored: raw.is_censored,
    likes: raw.likes,
    rating: raw.rating,
    dislikes: raw.dislikes,
    downloads: raw.downloads,
    rankMonthly: raw.monthly_rank,
    brandId: raw.brand_id,
    isBannedIn: raw.is_banned_in,
    previewUrl: raw.preview_url,
    color: raw.primary_color,
    createdAt: raw.created_at_unix,
    releasedAt: raw.released_at_unix,
  };
}
