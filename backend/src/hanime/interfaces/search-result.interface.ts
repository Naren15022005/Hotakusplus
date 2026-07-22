export interface SearchResult {
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
