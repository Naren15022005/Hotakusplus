# Hotakusplus — Guía de uso

## Stack

| Componente | Tecnología |
|---|---|
| Backend | NestJS 11 + TypeScript |
| Frontend | Vanilla JS (HTML inyectado por NestJS) |
| API externa | [hentai-api](https://github.com/shimizudev/hentai-api) (Bun + Hono) |
| Base de datos | PostgreSQL 16 (Docker) |
| Caché | Redis 7 (Docker) |

## Requisitos

- Node.js 22+
- Docker (para PostgreSQL y Redis, opcional si la hentai-api ya corre)
- [hentai-api](https://github.com/shimizudev/hentai-api) corriendo en `http://localhost:3000`

## Inicio rápido

```bash
# 1. Iniciar dependencias (PostgreSQL + Redis)
docker compose up -d

# 2. Iniciar hentai-api (ver repo oficial)
# cd ../hentai-api && bun run dev

# 3. Iniciar backend
cd backend
npm install
npm run start:dev
```

El servidor arranca en `http://localhost:4000`.

## Endpoints

### Frontend visual
```
GET / → HTML Tester
```
Abre `http://localhost:4000` en el navegador para probar los endpoints desde una interfaz gráfica.

### API REST (proxy a hentai-api)

```
GET /api/hanime/search/:query
GET /api/hanime/:slug
GET /api/hanime/streams/:slug

GET /api/hh/search/:query
GET /api/hh/:id
GET /api/hh/sources/:id

GET /api/r34/autocomplete/:query
GET /api/r34/search/:query
GET /api/r34/:id
```

## Arquitectura

```
cliente (browser/curl)
    │
    ▼
NestJS backend :4000
    │
    ├── GET / → FrontendController → HTML + JS
    │
    └── /api/* → proxy HTTP → hentai-api :3000
                                │
                                ├── Hanime.tv
                                ├── HentaiHaven
                                └── Rule34
```

## Variables de entorno (`.env`)

| Variable | Default | Descripción |
|---|---|---|
| `PORT` | `4000` | Puerto del backend NestJS |
| `HENTAI_API_BASE_URL` | `http://localhost:3000` | URL base de la hentai-api |
| `HENTAI_API_KEY` | *(vacío)* | API key para rate limit elevado |

## Estructura del proyecto

```
backend/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── frontend.controller.ts        # Sirve el HTML tester
│   ├── common/
│   │   └── hentai-api-client/        # Cliente HTTP compartido
│   ├── hanime/                        # Módulo Hanime.tv
│   ├── hentai-haven/                  # Módulo HentaiHaven
│   └── rule34/                        # Módulo Rule34
├── .env
└── package.json

frontend/                              #(futuro)
docs/
└── api-externa.md
└── uso.md
```
