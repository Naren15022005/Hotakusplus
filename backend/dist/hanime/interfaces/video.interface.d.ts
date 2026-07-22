export interface Episode {
    id: number;
    slug: string;
    number: number;
    season: number;
    name: string;
    description: string;
    durationMs: number;
    isCensored: boolean;
    isSubbed: boolean;
    isDubbed: boolean;
    thumbnail: string;
    releasedAt: number;
}
export interface Video {
    title: string;
    slug: string;
    id: number;
    description?: string;
    views: number;
    posterUrl: string;
    coverUrl: string;
    brand: {
        name: string;
        id: number;
    };
    durationMs: number;
    isCensored: boolean;
    likes: number;
    rating: number;
    tags: {
        id: number;
        text: string;
    }[];
    episodes: {
        next: Episode | null;
        all: Episode[];
        random: Episode | null;
    };
}
