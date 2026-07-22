import { HentaiApiClientService } from '../common/hentai-api-client/hentai-api-client.service';
import { HentaiSearchResult } from './interfaces/hentai-search-result.interface';
import { HentaiInfo } from './interfaces/hentai-info.interface';
import { HentaiSourcesResponse } from './interfaces/hentai-source.interface';
export declare class HentaiHavenService {
    private readonly apiClient;
    constructor(apiClient: HentaiApiClientService);
    search(query: string): Promise<HentaiSearchResult[]>;
    getById(id: string): Promise<HentaiInfo>;
    getSources(id: string): Promise<HentaiSourcesResponse>;
}
