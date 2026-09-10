export interface AnimeEpisode {
  id: string | number;
  slug?: string;
  number: number;
  name: string;
  description?: string;
  thumbnail?: string;
  durationMs?: number;
  releasedRelative?: string;
}

export interface HanimeItem {
  id: number;
  name?: string;
  slug: string;
  title?: string;
  titles?: string[];
  description?: string;
  views?: number;
  bannerImage?: string;
  coverImage?: string;
  posterUrl?: string;
  brand?: { name: string; id: number };
  durationMs?: number;
  isCensored?: boolean;
  likes?: number;
  rating?: number;
  tags?: Array<{ id: number; text: string } | string>;
  episodes?: {
    all: AnimeEpisode[];
  };
}

export interface HanimeStream {
  id: number;
  serverId: number;
  kind: string;
  extension: string;
  mimeType: string;
  width: number;
  height: number;
  url: string;
  filename?: string;
}

export interface HentaiHavenItem {
  id: string;
  title: string;
  cover: string;
  rating?: number;
  released?: number;
  genres?: Array<{ id: string; name: string }>;
  totalEpisodes?: number;
  author?: string;
  summary?: string;
  views?: number;
  episodes?: AnimeEpisode[];
}

export interface HentaiHavenSource {
  label: string;
  src: string;
  type: string;
}

export interface Rule34Item {
  id: string;
  image?: string;
  fullImage?: string;
  resizedImageUrl?: string;
  tags: string[];
  type?: string;
  publishedBy?: string;
  rating?: string;
  comments?: Array<{ id: string; user: string; comment: string }>;
}

export type ProviderType = 'hanime' | 'hh' | 'r34';
export type FilterCategory = 'all' | 'popular' | 'uncensored' | 'recent';
