export interface ImageInfo {
  id: string;
  fullImage: string;
  resizedImageUrl: string;
  tags: string[];
  createdAt: number;
  publishedBy: string;
  rating: string;
  sizes: Record<string, { aspect: string; width: number; height: number }>;
  comments: { id: string; user: string; comment: string }[];
}
