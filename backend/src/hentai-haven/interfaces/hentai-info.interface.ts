export interface Genre {
  id: string;
  url: string;
  name: string;
}

export interface EpisodeInfo {
  id: string;
  title: string;
  thumbnail: string | null;
  number: number;
  releasedUTC: string;
  releasedRelative: string;
}

export interface HentaiInfo {
  id: string;
  title: string;
  cover: string;
  summary: string;
  views: number;
  ratingCount: number;
  released: number;
  genres: Genre[];
  totalEpisodes: number;
  episodes: EpisodeInfo[];
}
