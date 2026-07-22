export interface HentaiSource {
    label: string;
    src: string;
    type: string;
}
export interface HentaiSourcesResponse {
    sources: HentaiSource[];
    thumbnail: string;
}
