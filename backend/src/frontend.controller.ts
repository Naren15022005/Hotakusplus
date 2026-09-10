import { Controller, Get, Header } from '@nestjs/common';

const MOCK = {
  hanimeSearch: [
    { id: 1, name: 'Example Hentai', slug: 'example-hentai', titles: ['Example Hentai', 'EH'], description: 'Un anime lleno de acción y drama en un mundo de fantasía.', views: 125000, bannerImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80', coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80', brand: { name: 'Studio X', id: 1 }, durationMs: 1800000, isCensored: false, likes: 4500, rating: 4.8, dislikes: 120, downloads: 89000, rankMonthly: 15, tags: ['Fantasía', 'Acción', 'Romance'], createdAt: 1700000000000, releasedAt: 1700000000000 }
  ],
  hanimeDetail: {
    title: 'Example Hentai — Episodio Especial', slug: 'example-hentai', id: 1, description: 'Una emocionante historia donde los protagonistas descubren antiguos secretos y poderes ocultos en la academia.', views: 125000, posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80', coverUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80', brand: { name: 'Studio X', id: 1 }, durationMs: 1800000, isCensored: false, likes: 4500, rating: 4.8, tags: [{ id: 1, text: 'Fantasía' }, { id: 2, text: 'Romance' }, { id: 3, text: 'Magia' }], episodes: { next: null, all: [{ id: 1, slug: 'ep-1', number: 1, season: 1, name: 'Episodio 1: El Despertar', description: 'Primer episodio de la saga.', durationMs: 1800000, isCensored: false, isSubbed: true, isDubbed: false, thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=80', releasedAt: 1700000000000 }], random: null }
  },
  hanimeStreams: [
    { id: 1, serverId: 1, kind: 'hls', extension: 'm3u8', mimeType: 'application/x-mpegURL', width: 1920, height: 1080, durationInMs: 1800000, filesizeMbs: 450, filename: 'example_1080p.m3u8', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' }
  ],
  hhSearch: [
    { id: 'hh-1', title: 'Sample Hentai Haven — Vol. 1', cover: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80', rating: 4.6, released: 2024, genres: [{ id: 'g1', url: '/genre/action', name: 'Acción' }, { id: 'g2', url: '/genre/harem', name: 'Harem' }], totalEpisodes: 3, alternative: 'Alternative Title Vol 1', author: 'Animation Master' }
  ],
  hhDetail: {
    id: 'hh-1', title: 'Sample Hentai Haven — Vol. 1', cover: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80', summary: 'Serie completa producida con los estándares más altos de animación moderna.', views: 98000, ratingCount: 2400, released: 2024, genres: [{ id: 'g1', url: '/genre/action', name: 'Acción' }, { id: 'g2', url: '/genre/harem', name: 'Harem' }], totalEpisodes: 3, episodes: [{ id: 'ep-1', title: 'Episodio 1', thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80', number: 1, releasedUTC: '2024-01-01T00:00:00Z', releasedRelative: 'Reciente' }]
  },
  hhSources: { sources: [{ label: '1080p Full HD', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', type: 'video/mp4' }], thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80' },
  r34Autocomplete: [{ label: 'catgirl', value: 'catgirl', count: 1500 }, { label: 'cyberpunk', value: 'cyberpunk', count: 3200 }, { label: 'anime_art', value: 'anime_art', count: 8400 }],
  r34Search: { results: [{ id: 'img-1', image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&auto=format&fit=crop&q=80', tags: ['cyberpunk', 'neon', 'catgirl'], type: 'preview' }], total: 1, page: 1, pages: 1, next: 1, previous: 1, hasNextPage: false },
  r34Detail: { id: 'img-1', fullImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=1200&auto=format&fit=crop&q=80', resizedImageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80', tags: ['cyberpunk', 'neon', 'futuristic', 'digital_art'], createdAt: 1700000000000, publishedBy: 'cyber_artist', rating: 'safe', sizes: { original: { aspect: '16:9', width: 1920, height: 1080 } }, comments: [{ id: 'c1', user: 'otaku_fan', comment: '¡Increíble paleta de colores y detalle!' }] }
};

@Controller()
export class FrontendController {
  @Get()
  @Header('Content-Type', 'text/html')
  index(): string {
    return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Hotakusplus — Catálogo Interactivo</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
<style>
:root {
  --bg-dark: #09090d;
  --bg-card: #12121a;
  --bg-hover: #1b1b26;
  --accent-purple: #8b5cf6;
  --accent-pink: #ec4899;
  --accent-blue: #3b82f6;
  --text-main: #f4f4f5;
  --text-muted: #9ca3af;
  --border-color: rgba(255,255,255,0.08);
  --glass-bg: rgba(18, 18, 26, 0.75);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: var(--bg-dark);
  color: var(--text-main);
  min-height: 100vh;
  padding-bottom: 3rem;
}

/* Header */
header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 2rem;
}
.header-container {
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}
.brand-logo {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--accent-purple), var(--accent-pink));
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 1.2rem;
  color: white;
  box-shadow: 0 0 15px rgba(236,72,153,0.4);
}
.brand-title {
  font-size: 1.4rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 30%, var(--accent-pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}
.brand-tag {
  font-size: 0.65rem;
  background: rgba(139,92,246,0.2);
  color: #c4b5fd;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid rgba(139,92,246,0.3);
  font-weight: 600;
  text-transform: uppercase;
}

/* Controls Header Bar */
.nav-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  max-width: 700px;
}
.search-box {
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 0.4rem 0.8rem;
  flex: 1;
  transition: all 0.3s ease;
}
.search-box:focus-within {
  border-color: var(--accent-purple);
  box-shadow: 0 0 12px rgba(139,92,246,0.25);
  background: rgba(255,255,255,0.08);
}
.search-box input {
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-main);
  font-family: inherit;
  font-size: 0.9rem;
  width: 100%;
}
.btn-search {
  background: linear-gradient(135deg, var(--accent-purple), #7c3aed);
  border: none;
  color: white;
  padding: 0.45rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}
.btn-search:hover { opacity: 0.9; transform: translateY(-1px); }

/* Navigation Tabs */
.tabs-bar {
  max-width: 1300px;
  margin: 1.5rem auto 1rem;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.tabs-group {
  display: flex;
  gap: 0.5rem;
  background: rgba(255,255,255,0.03);
  padding: 4px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
}
.tab-btn {
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-family: inherit;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.tab-btn:hover { color: var(--text-main); }
.tab-btn.active {
  background: linear-gradient(135deg, var(--accent-purple), var(--accent-pink));
  color: white;
  box-shadow: 0 4px 15px rgba(139,92,246,0.35);
}

.mode-toggle {
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
}
.mode-toggle:hover { background: rgba(255,255,255,0.12); }

/* Content Main Container */
main {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 2rem;
}

.provider-header {
  margin-bottom: 1.5rem;
}
.provider-title {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.provider-desc {
  color: var(--text-muted);
  font-size: 0.88rem;
}

/* Catalog Grid */
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 1.5rem;
}
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  position: relative;
}
.card:hover {
  transform: translateY(-6px);
  border-color: rgba(236,72,153,0.4);
  box-shadow: 0 12px 30px rgba(0,0,0,0.6), 0 0 20px rgba(139,92,246,0.25);
}
.card-media {
  position: relative;
  width: 100%;
  padding-top: 140%; /* 1:1.4 aspect ratio */
  background: #181824;
  overflow: hidden;
}
.card-media img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.card:hover .card-media img {
  transform: scale(1.06);
}
.card-badge-top {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}
.badge {
  background: rgba(9, 9, 13, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.12);
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  gap: 4px;
}
.badge-rating { color: #fbbf24; }
.badge-censored { background: rgba(239, 68, 68, 0.85); }
.badge-uncensored { background: rgba(16, 185, 129, 0.85); }

.card-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}
.card-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-sub {
  font-size: 0.8rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: auto;
  padding-top: 0.5rem;
}
.tag-chip {
  font-size: 0.7rem;
  background: rgba(255,255,255,0.06);
  color: #d1d5db;
  padding: 2px 7px;
  border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.05);
}

/* Modal Detail & Player */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(12px);
  display: none;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
.modal-overlay.active { display: flex; }
.modal-container {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.9);
}
.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0,0,0,0.7);
  border: 1px solid var(--border-color);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: all 0.2s;
}
.modal-close:hover { background: var(--accent-pink); }

.modal-header-media {
  width: 100%;
  background: #000;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  position: relative;
}
.video-player-container {
  width: 100%;
  aspect-ratio: 16/9;
  background: #000;
}
.video-player-container video {
  width: 100%;
  height: 100%;
  outline: none;
}

.modal-content {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.modal-meta-header {
  display: flex;
  gap: 1.5rem;
}
.modal-poster {
  width: 120px;
  height: 170px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(0,0,0,0.5);
}
.modal-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.modal-title {
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1.2;
}
.modal-description {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.episodes-selector {
  margin-top: 1rem;
}
.episodes-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}
.episodes-grid {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.ep-btn {
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}
.ep-btn:hover, .ep-btn.active {
  background: var(--accent-purple);
  border-color: var(--accent-purple);
  color: white;
}

/* JSON Inspection View */
.json-view-container {
  display: none;
  background: #060609;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1.25rem;
  margin-top: 1rem;
}
.json-view-container.active { display: block; }
pre {
  color: #a7f3d0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.82rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 500px;
  overflow-y: auto;
}

.loader {
  display: none;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  gap: 0.75rem;
  color: var(--accent-purple);
  font-weight: 600;
}
.loader.active { display: flex; }
.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(139,92,246,0.3);
  border-top-color: var(--accent-purple);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Responsive adjustments */
@media (max-width: 640px) {
  header { padding: 1rem; }
  main { padding: 0 1rem; }
  .tabs-bar { padding: 0 1rem; flex-direction: column; align-items: stretch; }
  .modal-meta-header { flex-direction: column; }
  .modal-poster { width: 100%; height: 200px; }
}
</style>
</head>
<body>

<header>
  <div class="header-container">
    <a href="#" class="brand">
      <div class="brand-logo">H+</div>
      <div>
        <div class="brand-title">HOTAKUSPLUS</div>
      </div>
      <span class="brand-tag">v2.0 Visual</span>
    </a>

    <div class="nav-controls">
      <div class="search-box">
        <input type="text" id="globalSearchInput" placeholder="Buscar animes, series o tags..." value="pokemon">
      </div>
      <button class="btn-search" onclick="triggerSearch()">🔍 Buscar</button>
    </div>
  </div>
</header>

<div class="tabs-bar">
  <div class="tabs-group">
    <button class="tab-btn active" id="tab-hanime" onclick="switchProvider('hanime')">🔥 Hanime.tv</button>
    <button class="tab-btn" id="tab-hh" onclick="switchProvider('hh')">🎥 HentaiHaven</button>
    <button class="tab-btn" id="tab-r34" onclick="switchProvider('r34')">🖼️ Rule34</button>
  </div>

  <button class="mode-toggle" onclick="toggleViewMode()">
    <span id="modeIcon">💻</span>
    <span id="modeText">Modo JSON</span>
  </button>
</div>

<main>
  <div class="provider-header">
    <h2 class="provider-title" id="providerTitle">🔥 Catálogo Hanime.tv</h2>
    <p class="provider-desc" id="providerDesc">Explora los últimos lanzamientos de anime y streams de alta calidad.</p>
  </div>

  <div id="loader" class="loader">
    <div class="spinner"></div>
    <span>Cargando contenido en vivo...</span>
  </div>

  <div id="catalogGrid" class="catalog-grid"></div>

  <div id="jsonView" class="json-view-container">
    <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.5rem;" id="jsonUrlInfo">RAW API Output</div>
    <pre id="jsonPre"></pre>
  </div>
</main>

<!-- Modal Detail & Streaming -->
<div id="detailModal" class="modal-overlay">
  <div class="modal-container">
    <button class="modal-close" onclick="closeModal()">✕</button>
    
    <div class="modal-header-media" id="modalMediaContainer">
      <div class="video-player-container">
        <video id="hlsPlayer" controls poster=""></video>
      </div>
    </div>

    <div class="modal-content">
      <div class="modal-meta-header">
        <img id="modalPoster" class="modal-poster" src="" alt="Cover">
        <div class="modal-info">
          <h2 id="modalTitle" class="modal-title">Título del Anime</h2>
          <div style="display:flex; gap:0.5rem; align-items:center; margin-top:0.25rem;">
            <span id="modalRating" class="badge badge-rating">⭐ 4.8</span>
            <span id="modalCensorship" class="badge">Sin censura</span>
            <span id="modalViews" style="font-size:0.8rem; color:var(--text-muted);">👁️ 125,000 vistas</span>
          </div>
          <p id="modalDescription" class="modal-description">Descripción detallada del contenido...</p>
          <div id="modalTags" class="tags-row"></div>
        </div>
      </div>

      <div class="episodes-selector" id="episodesSelectorArea">
        <h3 class="episodes-title">Fuentes / Episodios disponibles</h3>
        <div id="episodesGrid" class="episodes-grid"></div>
      </div>
    </div>
  </div>
</div>

<script>
const MOCK = ${JSON.stringify(MOCK)};
let currentProvider = 'hanime';
let isJsonMode = false;
let hlsInstance = null;

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog(MOCK.hanimeSearch, 'hanime');
});

function switchProvider(provider) {
  currentProvider = provider;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('tab-' + provider).classList.add('active');

  const titleEl = document.getElementById('providerTitle');
  const descEl = document.getElementById('providerDesc');
  const input = document.getElementById('globalSearchInput');

  if (provider === 'hanime') {
    titleEl.textContent = '🔥 Catálogo Hanime.tv';
    descEl.textContent = 'Explora los últimos lanzamientos de anime y streams de alta calidad.';
    input.value = 'pokemon';
    renderCatalog(MOCK.hanimeSearch, 'hanime');
  } else if (provider === 'hh') {
    titleEl.textContent = '🎥 Catálogo HentaiHaven';
    descEl.textContent = 'Transmisiones rápidas y archivo completo de series hentai.';
    input.value = 'naruto';
    renderCatalog(MOCK.hhSearch, 'hh');
  } else if (provider === 'r34') {
    titleEl.textContent = '🖼️ Galería Rule34';
    descEl.textContent = 'Búsqueda paginada e ilustraciones en alta definición.';
    input.value = 'catgirl';
    renderCatalog(MOCK.r34Search.results, 'r34');
  }
}

async function triggerSearch() {
  const query = document.getElementById('globalSearchInput').value.trim();
  if (!query) return;

  showLoader(true);
  let path = '';

  if (currentProvider === 'hanime') path = '/api/hanime/search/' + encodeURIComponent(query);
  else if (currentProvider === 'hh') path = '/api/hh/search/' + encodeURIComponent(query);
  else if (currentProvider === 'r34') path = '/api/r34/search/' + encodeURIComponent(query);

  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Status HTTP ' + res.status);
    const data = await res.json();
    showLoader(false);
    updateJsonView(path, res.status, data);

    let items = data;
    if (currentProvider === 'r34' && data.results) items = data.results;

    renderCatalog(items, currentProvider);
  } catch (e) {
    showLoader(false);
    console.warn('Fallback a datos mock por error:', e.message);
    const fallback = currentProvider === 'hanime' ? MOCK.hanimeSearch : currentProvider === 'hh' ? MOCK.hhSearch : MOCK.r34Search.results;
    updateJsonView(path + ' (FALLBACK MOCK)', 200, fallback);
    renderCatalog(fallback, currentProvider);
  }
}

function renderCatalog(items, provider) {
  const grid = document.getElementById('catalogGrid');
  grid.innerHTML = '';

  if (!items || items.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-muted)">No se encontraron resultados en el catálogo.</div>';
    return;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    if (provider === 'hanime') {
      const cover = item.coverImage || item.bannerImage || 'https://via.placeholder.com/300x450';
      const rating = item.rating ? '⭐ ' + item.rating : '⭐ 4.5';
      const views = item.views ? (item.views / 1000).toFixed(0) + 'k vistas' : 'Popular';
      const isCensored = item.isCensored ? '<span class="badge badge-censored">Censored</span>' : '<span class="badge badge-uncensored">Uncensored</span>';
      const tagsHtml = (item.tags || []).slice(0, 3).map(t => '<span class="tag-chip">' + (t.text || t) + '</span>').join('');

      card.innerHTML = \`
        <div class="card-media">
          <img src="\${cover}" alt="\${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&fit=crop'">
          <div class="card-badge-top">
            <span class="badge badge-rating">\${rating}</span>
            \${isCensored}
          </div>
        </div>
        <div class="card-body">
          <div class="card-title">\${item.name || item.titles?.[0] || 'Anime Hentai'}</div>
          <div class="card-sub">
            <span>\${item.brand?.name || 'Estudio Anónimo'}</span> • <span>\${views}</span>
          </div>
          <div class="tags-row">\${tagsHtml}</div>
        </div>
      \`;
      card.onclick = () => openHanimeDetail(item.slug || 'example-hentai', item);
    } 
    else if (provider === 'hh') {
      const cover = item.cover || 'https://via.placeholder.com/300x450';
      const rating = item.rating ? '⭐ ' + item.rating : '⭐ 4.2';
      const eps = item.totalEpisodes ? item.totalEpisodes + ' Eps' : 'Serie';
      const genresHtml = (item.genres || []).slice(0, 3).map(g => '<span class="tag-chip">' + (g.name || g) + '</span>').join('');

      card.innerHTML = \`
        <div class="card-media">
          <img src="\${cover}" alt="\${item.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&fit=crop'">
          <div class="card-badge-top">
            <span class="badge badge-rating">\${rating}</span>
            <span class="badge">\${eps}</span>
          </div>
        </div>
        <div class="card-body">
          <div class="card-title">\${item.title}</div>
          <div class="card-sub">
            <span>\${item.author || 'HentaiHaven'}</span> • <span>\${item.released || '2024'}</span>
          </div>
          <div class="tags-row">\${genresHtml}</div>
        </div>
      \`;
      card.onclick = () => openHhDetail(item.id || 'hh-1', item);
    } 
    else if (provider === 'r34') {
      const img = item.image || item.fullImage || 'https://via.placeholder.com/400x400';
      const tagsHtml = (item.tags || []).slice(0, 3).map(t => '<span class="tag-chip">#' + t + '</span>').join('');

      card.innerHTML = \`
        <div class="card-media" style="padding-top: 100%;">
          <img src="\${img}" alt="Illustration" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1563089145-599997674d42?w=400&fit=crop'">
          <div class="card-badge-top">
            <span class="badge">ID: \${item.id}</span>
          </div>
        </div>
        <div class="card-body">
          <div class="card-title">Ilustración #\${item.id}</div>
          <div class="tags-row">\${tagsHtml}</div>
        </div>
      \`;
      card.onclick = () => openR34Detail(item.id || 'img-1', item);
    }

    grid.appendChild(card);
  });
}

async function openHanimeDetail(slug, initialItem) {
  showLoader(true);
  try {
    const detail = await fetch('/api/hanime/' + encodeURIComponent(slug)).then(r => r.json());
    const streams = await fetch('/api/hanime/streams/' + encodeURIComponent(slug)).then(r => r.json());
    showLoader(false);

    setupModal({
      title: detail.title || initialItem.name,
      description: detail.description || 'Sin descripción disponible.',
      poster: detail.posterUrl || initialItem.coverImage,
      rating: '⭐ ' + (detail.rating || 4.8),
      views: (detail.views || 125000).toLocaleString() + ' vistas',
      censorship: detail.isCensored ? 'Censurado' : 'Sin Censura',
      tags: detail.tags || initialItem.tags || [],
      streams: streams && streams.length ? streams : MOCK.hanimeStreams
    });
  } catch {
    showLoader(false);
    setupModal({
      title: MOCK.hanimeDetail.title,
      description: MOCK.hanimeDetail.description,
      poster: MOCK.hanimeDetail.posterUrl,
      rating: '⭐ ' + MOCK.hanimeDetail.rating,
      views: MOCK.hanimeDetail.views.toLocaleString() + ' vistas',
      censorship: 'Sin Censura',
      tags: MOCK.hanimeDetail.tags,
      streams: MOCK.hanimeStreams
    });
  }
}

async function openHhDetail(id, initialItem) {
  showLoader(true);
  try {
    const detail = await fetch('/api/hh/' + encodeURIComponent(id)).then(r => r.json());
    const sourcesData = await fetch('/api/hh/sources/' + encodeURIComponent(id)).then(r => r.json());
    showLoader(false);

    setupModal({
      title: detail.title || initialItem.title,
      description: detail.summary || 'Serie HentaiHaven recomendada.',
      poster: detail.cover || initialItem.cover,
      rating: '⭐ ' + (detail.ratingCount ? '4.6' : '4.2'),
      views: (detail.views || 50000).toLocaleString() + ' vistas',
      censorship: 'HD 1080p',
      tags: detail.genres || [],
      sources: sourcesData?.sources || MOCK.hhSources.sources
    });
  } catch {
    showLoader(false);
    setupModal({
      title: MOCK.hhDetail.title,
      description: MOCK.hhDetail.summary,
      poster: MOCK.hhDetail.cover,
      rating: '⭐ 4.6',
      views: MOCK.hhDetail.views.toLocaleString() + ' vistas',
      censorship: 'HD 1080p',
      tags: MOCK.hhDetail.genres,
      sources: MOCK.hhSources.sources
    });
  }
}

async function openR34Detail(id, initialItem) {
  showLoader(true);
  try {
    const detail = await fetch('/api/r34/' + encodeURIComponent(id)).then(r => r.json());
    showLoader(false);

    setupModal({
      title: 'Rule34 Artwork #' + (detail.id || id),
      description: 'Publicado por: ' + (detail.publishedBy || 'Desconocido') + ' | Rating: ' + (detail.rating || 'Safe'),
      poster: detail.resizedImageUrl || initialItem.image,
      rating: 'ID: ' + id,
      views: 'HD Art',
      censorship: 'Rule34',
      tags: detail.tags || initialItem.tags || [],
      fullImage: detail.fullImage || initialItem.image
    });
  } catch {
    showLoader(false);
    setupModal({
      title: 'Rule34 Artwork #' + id,
      description: 'Publicado por: artist123 | Rating: Safe',
      poster: MOCK.r34Detail.resizedImageUrl,
      rating: 'ID: ' + id,
      views: 'HD Art',
      censorship: 'Rule34',
      tags: MOCK.r34Detail.tags,
      fullImage: MOCK.r34Detail.fullImage
    });
  }
}

function setupModal(data) {
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalDescription').textContent = data.description;
  document.getElementById('modalPoster').src = data.poster;
  document.getElementById('modalRating').textContent = data.rating;
  document.getElementById('modalViews').textContent = data.views;
  document.getElementById('modalCensorship').textContent = data.censorship;

  const tagsContainer = document.getElementById('modalTags');
  tagsContainer.innerHTML = (data.tags || []).map(t => '<span class="tag-chip">' + (t.text || t.name || t) + '</span>').join('');

  const epGrid = document.getElementById('episodesGrid');
  epGrid.innerHTML = '';

  const player = document.getElementById('hlsPlayer');
  
  if (data.fullImage) {
    document.getElementById('modalMediaContainer').innerHTML = '<img src="' + data.fullImage + '" style="width:100%; max-height:450px; object-fit:contain; background:#000;">';
    document.getElementById('episodesSelectorArea').style.display = 'none';
  } else {
    document.getElementById('modalMediaContainer').innerHTML = '<div class="video-player-container"><video id="hlsPlayer" controls poster="' + data.poster + '"></video></div>';
    document.getElementById('episodesSelectorArea').style.display = 'block';

    const videoEl = document.getElementById('hlsPlayer');

    const streamList = data.streams || [];
    const sourceList = data.sources || [];

    if (streamList.length > 0) {
      streamList.forEach((s, idx) => {
        const btn = document.createElement('button');
        btn.className = 'ep-btn' + (idx === 0 ? ' active' : '');
        btn.textContent = s.filename || s.height ? (s.height + 'p ' + s.kind) : ('Opción ' + (idx + 1));
        btn.onclick = () => {
          document.querySelectorAll('.ep-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          loadVideoSource(videoEl, s.url);
        };
        epGrid.appendChild(btn);
      });
      loadVideoSource(videoEl, streamList[0].url);
    } else if (sourceList.length > 0) {
      sourceList.forEach((s, idx) => {
        const btn = document.createElement('button');
        btn.className = 'ep-btn' + (idx === 0 ? ' active' : '');
        btn.textContent = s.label || ('Calidad ' + (idx + 1));
        btn.onclick = () => {
          document.querySelectorAll('.ep-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          loadVideoSource(videoEl, s.src);
        };
        epGrid.appendChild(btn);
      });
      loadVideoSource(videoEl, sourceList[0].src);
    }
  }

  document.getElementById('detailModal').classList.add('active');
}

function loadVideoSource(videoEl, url) {
  if (hlsInstance) {
    hlsInstance.destroy();
    hlsInstance = null;
  }

  if (url.endsWith('.m3u8') && Hls.isSupported()) {
    hlsInstance = new Hls();
    hlsInstance.loadSource(url);
    hlsInstance.attachMedia(videoEl);
  } else {
    videoEl.src = url;
  }
}

function closeModal() {
  document.getElementById('detailModal').classList.remove('active');
  const player = document.getElementById('hlsPlayer');
  if (player) {
    player.pause();
    player.src = '';
  }
  if (hlsInstance) {
    hlsInstance.destroy();
    hlsInstance = null;
  }
}

function toggleViewMode() {
  isJsonMode = !isJsonMode;
  const jsonView = document.getElementById('jsonView');
  const catalogGrid = document.getElementById('catalogGrid');
  const icon = document.getElementById('modeIcon');
  const text = document.getElementById('modeText');

  if (isJsonMode) {
    jsonView.classList.add('active');
    catalogGrid.style.display = 'none';
    icon.textContent = '🎬';
    text.textContent = 'Modo Catálogo';
  } else {
    jsonView.classList.remove('active');
    catalogGrid.style.display = 'grid';
    icon.textContent = '💻';
    text.textContent = 'Modo JSON';
  }
}

function updateJsonView(url, status, data) {
  document.getElementById('jsonUrlInfo').textContent = 'URL: ' + url + ' | Status: ' + status;
  document.getElementById('jsonPre').textContent = JSON.stringify(data, null, 2);
}

function showLoader(visible) {
  const loader = document.getElementById('loader');
  if (visible) loader.classList.add('active');
  else loader.classList.remove('active');
}
</script>
</body>
</html>`;
  }
}
