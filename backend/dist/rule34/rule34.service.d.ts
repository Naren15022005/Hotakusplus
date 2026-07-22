import { HentaiApiClientService } from '../common/hentai-api-client/hentai-api-client.service';
import { AutocompleteItem } from './interfaces/autocomplete-item.interface';
import { PaginatedResult } from './interfaces/paginated-result.interface';
import { ImageInfo } from './interfaces/image-info.interface';
export declare class Rule34Service {
    private readonly apiClient;
    constructor(apiClient: HentaiApiClientService);
    autocomplete(query: string): Promise<AutocompleteItem[]>;
    search(query: string): Promise<PaginatedResult>;
    getById(id: string): Promise<ImageInfo>;
}
