import { HanimeService } from './hanime.service';
export declare class HanimeController {
    private readonly hanimeService;
    constructor(hanimeService: HanimeService);
    search(query: string): Promise<import("./interfaces/search-result.interface").SearchResult[]>;
    getStreams(slug: string): Promise<import("./interfaces/stream.interface").Stream[]>;
    getBySlug(slug: string): Promise<import("./interfaces/video.interface").Video>;
}
