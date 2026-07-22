import { HentaiHavenService } from './hentai-haven.service';
export declare class HentaiHavenController {
    private readonly hentaiHavenService;
    constructor(hentaiHavenService: HentaiHavenService);
    search(query: string): Promise<import("./interfaces/hentai-search-result.interface").HentaiSearchResult[]>;
    getSources(id: string): Promise<import("./interfaces/hentai-source.interface").HentaiSourcesResponse>;
    getById(id: string): Promise<import("./interfaces/hentai-info.interface").HentaiInfo>;
}
