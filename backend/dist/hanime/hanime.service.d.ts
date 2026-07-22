import { HentaiApiClientService } from '../common/hentai-api-client/hentai-api-client.service';
import { SearchResult } from './interfaces/search-result.interface';
import { Video } from './interfaces/video.interface';
import { Stream } from './interfaces/stream.interface';
export declare class HanimeService {
    private readonly apiClient;
    constructor(apiClient: HentaiApiClientService);
    search(query: string): Promise<SearchResult[]>;
    getBySlug(slug: string): Promise<Video>;
    getStreams(slug: string): Promise<Stream[]>;
}
