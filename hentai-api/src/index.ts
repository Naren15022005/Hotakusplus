import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { HentaiHaven } from "./providers/hentai-haven";
import { Rule34 } from "./providers/rule34";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import Redis from "ioredis";
import { MongoClient, Db, Collection } from "mongodb";
import type { Context } from "hono";
import { z } from 'zod';
import Hanime from "./providers/hanime";
import { SearchResultSchema as HanimeSearchResultSchema, VideoSchema } from "./schema/hanime";
import { InfoSchema, SearchAutocompleteSchema, SearchResultSchema as R34SearchResultSchema } from "./schema/r34";
import { HentaiInfoSchema, HentaiSearchResultSchema, HentaiSourceSchema } from "./schema/hentai-haven";

let redis: Redis | null = null;
if (process.env.REDIS_HOST) {
  try {
    redis = new Redis({
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASSWORD || '',
      lazyConnect: true
    });
    redis.connect().catch(() => {
      redis = null;
    });
  } catch {
    redis = null;
  }
}

const inMemoryCache = new Map<string, { data: any; expiry: number }>();

const mongoClient = process.env.MONGODB_URL ? new MongoClient(process.env.MONGODB_URL) : undefined;
let db: Db | undefined;
let apiKeyCollection: Collection | undefined;

const connectToDb = async () => {
  if (mongoClient) {
    try {
      await mongoClient.connect();
      db = mongoClient.db();
      apiKeyCollection = db.collection("apiKeys");
    } catch {}
  }
};

const app = new Hono();

app.use(cors());
app.use(prettyJSON());
app.use(logger());

app.get("/", (c) => {
  return c.text("Welcome to Hentai API running on Node.js!");
});

const rateLimit = async (c: Context, key: string, limit: number, ttl: number): Promise<Response | void> => {
  if (redis) {
    try {
      const count = await redis.incr(key);
      if (count > limit) {
        return c.json({ error: "Rate limit exceeded" }, 429);
      }
      await redis.expire(key, ttl);
      return;
    } catch {}
  }
  return undefined;
};

const cache = async <T extends object>(c: Context, key: string, fetcher: () => Promise<T>): Promise<Response> => {
  const now = Date.now();

  if (redis) {
    try {
      const cached = await redis.get(key);
      if (cached) {
        const data = JSON.parse(cached);
        return c.json(data);
      }
    } catch {}
  }

  const memCached = inMemoryCache.get(key);
  if (memCached && memCached.expiry > now) {
    return c.json(memCached.data);
  }

  const data = await fetcher();

  if (redis) {
    try {
      await redis.set(key, JSON.stringify(data), 'EX', 3600);
    } catch {}
  }

  inMemoryCache.set(key, { data, expiry: now + 3600 * 1000 });
  return c.json(data);
};

const apiKeyAuth = async (c: Context): Promise<Response | void> => {
  const apiKey = c.req.header("x-api-key") || c.req.query("apiKey");
  if (!apiKey) {
    return undefined;
  }
  const key = await apiKeyCollection?.findOne({ key: apiKey });
  if (!key) {
    return c.json({ error: "Invalid API key" }, 401);
  }
  return undefined;
};

const handleRequest = async <T>(c: Context, provider: any, method: string, schema: z.ZodSchema<any>, ...args: any[]): Promise<Response> => {
  try {
    const apiKeyResult = await apiKeyAuth(c);
    const clientIp = c.req.header("x-forwarded-for") || "127.0.0.1";
    const limit = apiKeyResult ? 1500 : 15;
    const ttl = 60;
    const rateLimitKey = `${provider.name}-${method}-${clientIp}`;
    const rateLimited = await rateLimit(c, rateLimitKey, limit, ttl);
    if (rateLimited) return rateLimited;

    const key = `${provider.name}-${method}-${JSON.stringify(args)}`;
    return await cache(c, key, async () => {
      const instance = new provider();
      const result = await instance[method](...args);
      return schema.parse(result);
    });
  } catch (error) {
    console.error("Error handling request:", error);
    if (error instanceof z.ZodError) {
      return c.json({ error: error.issues }, 422);
    }
    return c.json({ error: "Internal server error" }, 500);
  }
};

const querySchema = z.string().min(1);
const idSchema = z.string().min(1);

app.get("/api/hh/search/:query", async (c) => {
  const query = querySchema.parse(c.req.param("query"));
  return await handleRequest(c, HentaiHaven, "fetchSearchResult", HentaiSearchResultSchema, query);
});

app.get("/api/hh/:id", async (c) => {
  const id = idSchema.parse(c.req.param("id"));
  return await handleRequest(c, HentaiHaven, "fetchInfo", HentaiInfoSchema, id);
});

app.get("/api/hh/sources/:id", async (c) => {
  const id = idSchema.parse(c.req.param("id"));
  return await handleRequest(c, HentaiHaven, "fetchSources", HentaiSourceSchema, id);
});

app.get("/api/r34/autocomplete/:query", async (c) => {
  const query = querySchema.parse(c.req.param("query"));
  return await handleRequest(c, Rule34, "fetchSearchAutocomplete", SearchAutocompleteSchema, query);
});

app.get("/api/r34/search/:query", async (c) => {
  const query = querySchema.parse(c.req.param("query"));
  return await handleRequest(c, Rule34, "fetchSearchResult", R34SearchResultSchema, query);
});

app.get("/api/r34/:id", async (c) => {
  const id = idSchema.parse(c.req.param("id"));
  return await handleRequest(c, Rule34, "fetchInfo", InfoSchema, id);
});

app.get("/api/hanime/search/:query", async (c) => {
  const query = querySchema.parse(c.req.param("query"));
  return await handleRequest(c, Hanime, "search", z.array(HanimeSearchResultSchema), query);
});

app.get("/api/hanime/:id", async (c) => {
  const id = idSchema.parse(c.req.param("id"));
  return await handleRequest(c, Hanime, "getInfo", VideoSchema, id);
});

app.get("/api/hanime/streams/:id", async (c) => {
  const id = idSchema.parse(c.req.param("id"));
  return await handleRequest(c, Hanime, "getEpisode", z.any(), id);
});

const port = Number(process.env.PORT) || 3000;

console.log(`Starting Hentai API on http://localhost:${port}`);
serve({
  fetch: app.fetch,
  port: port,
});

connectToDb();