export interface ImageResult {
    id: string;
    image: string;
    tags: string[];
    type: 'preview';
}
export interface PaginatedResult {
    results: ImageResult[];
    total: number;
    page: number;
    pages: number;
    next: number;
    previous: number;
    hasNextPage: boolean;
}
