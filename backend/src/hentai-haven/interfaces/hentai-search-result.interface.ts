export interface HentaiSearchResult {
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
