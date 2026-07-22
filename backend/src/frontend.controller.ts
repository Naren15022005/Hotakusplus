import { Controller, Get, Header } from '@nestjs/common';

const MOCK = {
  hanimeSearch: [
    { id: 1, name: 'Example Hentai', slug: 'example-hentai', titles: ['Example Hentai', 'EH'], description: 'Sample anime description', views: 125000, bannerImage: 'https://via.placeholder.com/800x200', coverImage: 'https://via.placeholder.com/300x450', brand: { name: 'Studio X', id: 1 }, durationMs: 1800000, isCensored: false, likes: 4500, rating: 4.5, dislikes: 120, downloads: 89000, rankMonthly: 15, tags: ['action', 'romance'], createdAt: 1700000000000, releasedAt: 1700000000000 }
  ],
  hanimeDetail: {
    title: 'Example Hentai', slug: 'example-hentai', id: 1, description: 'Full anime description with plot details', views: 125000, posterUrl: 'https://via.placeholder.com/300x450', coverUrl: 'https://via.placeholder.com/800x200', brand: { name: 'Studio X', id: 1 }, durationMs: 1800000, isCensored: false, likes: 4500, rating: 4.5, tags: [{ id: 1, text: 'action' }, { id: 2, text: 'romance' }], episodes: { next: null, all: [{ id: 1, slug: 'ep-1', number: 1, season: 1, name: 'Episode 1', description: 'First episode', durationMs: 1800000, isCensored: false, isSubbed: true, isDubbed: false, thumbnail: 'https://via.placeholder.com/300x170', releasedAt: 1700000000000 }], random: null }
  },
  hanimeStreams: [
    { id: 1, serverId: 1, kind: 'hls', extension: 'm3u8', mimeType: 'application/x-mpegURL', width: 1920, height: 1080, durationInMs: 1800000, filesizeMbs: 450, filename: 'example_1080p.m3u8', url: 'https://example.com/stream/example.m3u8' }
  ],
  hhSearch: [
    { id: 'hh-1', title: 'Sample Hentai Haven', cover: 'https://via.placeholder.com/300x450', rating: 4.2, released: 2024, genres: [{ id: 'g1', url: '/genre/action', name: 'Action' }], totalEpisodes: 3, alternative: 'Sample HH Alt', author: 'Author Name' }
  ],
  hhDetail: {
    id: 'hh-1', title: 'Sample Hentai Haven', cover: 'https://via.placeholder.com/300x450', summary: 'Detailed summary of the hentai series', views: 50000, ratingCount: 1200, released: 2024, genres: [{ id: 'g1', url: '/genre/action', name: 'Action' }], totalEpisodes: 3, episodes: [{ id: 'ep-1', title: 'Episode 1', thumbnail: 'https://via.placeholder.com/300x170', number: 1, releasedUTC: '2024-01-01T00:00:00Z', releasedRelative: '1 year ago' }]
  },
  hhSources: { sources: [{ label: '1080p', src: 'https://example.com/video.mp4', type: 'video/mp4' }], thumbnail: 'https://via.placeholder.com/300x170' },
  r34Autocomplete: [{ label: 'catgirl', value: 'catgirl', count: 1500 }, { label: 'cat_ears', value: 'cat_ears', count: 3200 }],
  r34Search: { results: [{ id: 'img-1', image: 'https://via.placeholder.com/250x250', tags: ['catgirl', 'solo'], type: 'preview' }], total: 1, page: 1, pages: 1, next: 1, previous: 1, hasNextPage: false },
  r34Detail: { id: 'img-1', fullImage: 'https://via.placeholder.com/800x800', resizedImageUrl: 'https://via.placeholder.com/400x400', tags: ['catgirl', 'solo', 'smile'], createdAt: 1700000000000, publishedBy: 'artist123', rating: 'safe', sizes: { original: { aspect: '1:1', width: 800, height: 800 } }, comments: [{ id: 'c1', user: 'user1', comment: 'Great image!' }] }
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
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hotakusplus — Catálogo API</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#0f0f11;color:#e4e4e7;padding:1.5rem;max-width:1200px;margin:0 auto}
h1{color:#a855f7;font-size:1.5rem}
.sub{color:#71717a;margin-bottom:1.5rem;font-size:.85rem}
.tabs{display:flex;gap:.25rem;margin-bottom:1.5rem;flex-wrap:wrap}
.tab{padding:.5rem 1rem;background:#18181b;border:1px solid #27272a;border-radius:6px;cursor:pointer;font-size:.85rem;color:#a1a1aa}
.tab.active{background:#7c3aed;border-color:#7c3aed;color:#fff}
.tab:hover{background:#27272a}
.panel{display:none}
.panel.active{display:block}
.endpoint{margin-bottom:1.5rem}
.endpoint h3{font-size:.9rem;color:#a855f7;margin-bottom:.25rem}
.endpoint .path{color:#3b82f6;font-size:.8rem;font-family:monospace;margin-bottom:.5rem}
.endpoint .actions{display:flex;gap:.5rem;margin-bottom:.5rem;flex-wrap:wrap}
.endpoint .actions button{background:#27272a;border:1px solid #3f3f46;color:#e4e4e7;padding:.35rem .7rem;border-radius:4px;cursor:pointer;font-size:.8rem}
.endpoint .actions button:hover{background:#3f3f46}
pre{background:#09090b;border:1px solid #27272a;border-radius:6px;padding:.75rem;overflow-x:auto;font-size:.75rem;line-height:1.4;max-height:400px;overflow-y:auto;white-space:pre-wrap;word-break:break-all}
.error{color:#ef4444}
.loading{color:#a855f7;animation:pulse 1.5s infinite}
.url{color:#71717a;font-size:.75rem;margin-bottom:.25rem}
.mock-badge{display:inline-block;background:#3b82f6;color:#fff;font-size:.65rem;padding:.1rem .4rem;border-radius:3px;margin-left:.5rem;vertical-align:middle;text-transform:uppercase}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@media(min-width:768px){.grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}}
</style>
</head>
<body>
<h1>Hotakusplus</h1>
<p class="sub">Catálogo de datos de cada proveedor — resultados mock + consultas en vivo</p>

<div class="tabs">
  <div class="tab active" onclick="switchTab('hanime')">Hanime.tv</div>
  <div class="tab" onclick="switchTab('hh')">HentaiHaven</div>
  <div class="tab" onclick="switchTab('r34')">Rule34</div>
</div>

<div id="panel-hanime" class="panel active">
  <div class="grid">
    <div class="endpoint">
      <h3>Search</h3>
      <div class="path">GET /api/hanime/search/:query</div>
      <div class="actions">
        <input id="hanimeQ" value="pokemon" style="flex:1;background:#27272a;border:1px solid #3f3f46;color:#e4e4e7;padding:.35rem .7rem;border-radius:4px;font-size:.8rem;min-width:100px">
        <button onclick="liveSearch('/api/hanime/search/','hanimeQ','r1')">Buscar</button>
      </div>
      <div id="r1" class="url"></div>
      <pre id="r1pre">${JSON.stringify(MOCK.hanimeSearch, null, 2)}</pre>
    </div>
    <div class="endpoint">
      <h3>Detail</h3>
      <div class="path">GET /api/hanime/:slug</div>
      <div class="actions">
        <input id="hanimeSlug" value="example-hentai" style="flex:1;background:#27272a;border:1px solid #3f3f46;color:#e4e4e7;padding:.35rem .7rem;border-radius:4px;font-size:.8rem;min-width:100px">
        <button onclick="liveSearch('/api/hanime/','hanimeSlug','r2')">Obtener</button>
      </div>
      <div id="r2" class="url"></div>
      <pre id="r2pre">${JSON.stringify(MOCK.hanimeDetail, null, 2)}</pre>
    </div>
    <div class="endpoint" style="grid-column:1/-1">
      <h3>Streams</h3>
      <div class="path">GET /api/hanime/streams/:slug</div>
      <div class="actions">
        <input id="hanimeStream" value="example-hentai" style="flex:1;background:#27272a;border:1px solid #3f3f46;color:#e4e4e7;padding:.35rem .7rem;border-radius:4px;font-size:.8rem;min-width:100px">
        <button onclick="liveSearch('/api/hanime/streams/','hanimeStream','r3')">Obtener</button>
      </div>
      <div id="r3" class="url"></div>
      <pre id="r3pre">${JSON.stringify(MOCK.hanimeStreams, null, 2)}</pre>
    </div>
  </div>
</div>

<div id="panel-hh" class="panel">
  <div class="grid">
    <div class="endpoint">
      <h3>Search</h3>
      <div class="path">GET /api/hh/search/:query</div>
      <div class="actions">
        <input id="hhQ" value="naruto" style="flex:1;background:#27272a;border:1px solid #3f3f46;color:#e4e4e7;padding:.35rem .7rem;border-radius:4px;font-size:.8rem;min-width:100px">
        <button onclick="liveSearch('/api/hh/search/','hhQ','r4')">Buscar</button>
      </div>
      <div id="r4" class="url"></div>
      <pre id="r4pre">${JSON.stringify(MOCK.hhSearch, null, 2)}</pre>
    </div>
    <div class="endpoint">
      <h3>Detail</h3>
      <div class="path">GET /api/hh/:id</div>
      <div class="actions">
        <input id="hhId" value="hh-1" style="flex:1;background:#27272a;border:1px solid #3f3f46;color:#e4e4e7;padding:.35rem .7rem;border-radius:4px;font-size:.8rem;min-width:100px">
        <button onclick="liveSearch('/api/hh/','hhId','r5')">Obtener</button>
      </div>
      <div id="r5" class="url"></div>
      <pre id="r5pre">${JSON.stringify(MOCK.hhDetail, null, 2)}</pre>
    </div>
    <div class="endpoint" style="grid-column:1/-1">
      <h3>Sources</h3>
      <div class="path">GET /api/hh/sources/:id</div>
      <div class="actions">
        <input id="hhSrc" value="hh-1" style="flex:1;background:#27272a;border:1px solid #3f3f46;color:#e4e4e7;padding:.35rem .7rem;border-radius:4px;font-size:.8rem;min-width:100px">
        <button onclick="liveSearch('/api/hh/sources/','hhSrc','r6')">Obtener</button>
      </div>
      <div id="r6" class="url"></div>
      <pre id="r6pre">${JSON.stringify(MOCK.hhSources, null, 2)}</pre>
    </div>
  </div>
</div>

<div id="panel-r34" class="panel">
  <div class="grid">
    <div class="endpoint">
      <h3>Autocomplete</h3>
      <div class="path">GET /api/r34/autocomplete/:query</div>
      <div class="actions">
        <input id="r34Ac" value="cat" style="flex:1;background:#27272a;border:1px solid #3f3f46;color:#e4e4e7;padding:.35rem .7rem;border-radius:4px;font-size:.8rem;min-width:100px">
        <button onclick="liveSearch('/api/r34/autocomplete/','r34Ac','r7')">Buscar</button>
      </div>
      <div id="r7" class="url"></div>
      <pre id="r7pre">${JSON.stringify(MOCK.r34Autocomplete, null, 2)}</pre>
    </div>
    <div class="endpoint">
      <h3>Search</h3>
      <div class="path">GET /api/r34/search/:query</div>
      <div class="actions">
        <input id="r34Sr" value="catgirl" style="flex:1;background:#27272a;border:1px solid #3f3f46;color:#e4e4e7;padding:.35rem .7rem;border-radius:4px;font-size:.8rem;min-width:100px">
        <button onclick="liveSearch('/api/r34/search/','r34Sr','r8')">Buscar</button>
      </div>
      <div id="r8" class="url"></div>
      <pre id="r8pre">${JSON.stringify(MOCK.r34Search, null, 2)}</pre>
    </div>
    <div class="endpoint" style="grid-column:1/-1">
      <h3>Detail</h3>
      <div class="path">GET /api/r34/:id</div>
      <div class="actions">
        <input id="r34Id" value="img-1" style="flex:1;background:#27272a;border:1px solid #3f3f46;color:#e4e4e7;padding:.35rem .7rem;border-radius:4px;font-size:.8rem;min-width:100px">
        <button onclick="liveSearch('/api/r34/','r34Id','r9')">Obtener</button>
      </div>
      <div id="r9" class="url"></div>
      <pre id="r9pre">${JSON.stringify(MOCK.r34Detail, null, 2)}</pre>
    </div>
  </div>
</div>

<script>
function switchTab(name){document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));document.getElementById('panel-'+name).classList.add('active');document.querySelector('.tab:nth-child('+(name==='hanime'?1:name==='hh'?2:3)+')').classList.add('active')}
async function liveSearch(base,inputId,resId){const input=document.getElementById(inputId);const pre=document.getElementById(resId+'pre');const urlEl=document.getElementById(resId);const path=base+encodeURIComponent(input.value);pre.textContent='Cargando...';pre.className='loading';urlEl.textContent='';try{const r=await fetch(path);urlEl.textContent='GET '+window.location.origin+path+' → '+r.status+' '+r.statusText;if(!r.ok){pre.textContent=await r.text();pre.className='error';return}pre.textContent=JSON.stringify(await r.json(),null,2);pre.className=''}catch(e){pre.textContent='Error: '+e.message+'\\n\\nMostrando datos mock de referencia';pre.className='error'}}
</script>
</body>
</html>`;
  }
}
