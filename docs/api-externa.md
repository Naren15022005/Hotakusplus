# API Externa — hentai-api

> Repo: https://github.com/shimizudev/hentai-api
> Stack: Bun + Hono + Redis (MongoDB opcional)
> Puerto por defecto: `3000`

## Providers

La API expone 3 proveedores de contenido:

### 1. Hanime.tv (`/api/hanime/*`)

| Endpoint | Descripción | Response |
|---|---|---|
| `GET /api/hanime/search/:query` | Buscar videos | `SearchResult[]` |
| `GET /api/hanime/:slug` | Info detallada + episodios | `Video` |
| `GET /api/hanime/streams/:slug` | Streams del video (calidades) | `Stream[]` |

**SearchResult:**
```ts
{
  id: number;
  name: string;
  titles: string[];
  slug: string;
  description: string;
  views: number;
  bannerImage: string;
  coverImage: string;
  brand: { name: string; id: number };
  durationMs: number;
  isCensored: boolean;
  likes: number;
  rating: number;
  dislikes: number;
  downloads: number;
  rankMonthly: number;
  tags: string[];
  createdAt: number;
  releasedAt: number;
}
```

**Video (detalle):**
```ts
{
  title: string;
  slug: string;
  id: number;
  description?: string;
  views: number;
  posterUrl: string;
  coverUrl: string;
  brand: { name: string; id: number };
  durationMs: number;
  isCensored: boolean;
  likes: number;
  rating: number;
  tags: { id: number; text: string }[];
  episodes: {
    next: Episode | null;
    all: Episode[];
    random: Episode | null;
  };
}
```

**Stream:**
```ts
{
  id: number;
  serverId: number;
  kind: string;
  extension: string;
  mimeType: string;
  width: number;
  height: number;
  durationInMs: number;
  filesizeMbs: number;
  filename: string;
  url: string;
}
```

---

### 2. HentaiHaven (`/api/hh/*`)

| Endpoint | Descripción | Response |
|---|---|---|
| `GET /api/hh/search/:query` | Buscar hentais | `HentaiSearchResult[]` |
| `GET /api/hh/:id` | Info detallada + episodios | `HentaiInfo` |
| `GET /api/hh/sources/:id` | Fuentes de video (base64 id) | `{ sources: HentaiSource[], thumbnail }` |

**HentaiSearchResult:**
```ts
{
  id: string;
  title: string;
  cover: string;
  rating: number;
  released: number;
  genres: { id: string; url: string; name: string }[];
  totalEpisodes: number;
  alternative: string;
  author: string;
}
```

**HentaiInfo:**
```ts
{
  id: string;
  title: string;
  cover: string;
  summary: string;
  views: number;
  ratingCount: number;
  released: number;
  genres: Genre[];
  totalEpisodes: number;
  episodes: { id: string; title: string; thumbnail: string | null; number: number; releasedUTC: string; releasedRelative: string }[];
}
```

**HentaiSource:**
```ts
{ label: string; src: string; type: string }
```

---

### 3. Rule34 (`/api/r34/*`)

| Endpoint | Descripción | Response |
|---|---|---|
| `GET /api/r34/autocomplete/:query` | Autocompletado de tags | `AutocompleteItem[]` |
| `GET /api/r34/search/:query` | Búsqueda paginada de imágenes | `PaginatedResult` |
| `GET /api/r34/:id` | Detalle de imagen + comentarios | `Info` |

**PaginatedResult:**
```ts
{
  results: { id: string; image: string; tags: string[]; type: "preview" }[];
  total: number;
  page: number;
  pages: number;
  next: number;
  previous: number;
  hasNextPage: boolean;
}
```

**Info (detalle imagen):**
```ts
{
  id: string;
  fullImage: string;
  resizedImageUrl: string;
  tags: string[];
  createdAt: number;
  publishedBy: string;
  rating: string;
  sizes: { aspect: string; width: number; height: number; ... };
  comments: { id: string; user: string; comment: string }[];
}
```

---

## Rate Limiting

- Sin API key: 15 requests/min
- Con API key (`x-api-key` header): 1500 requests/min
- Cache: Redis con TTL de 1 hora
