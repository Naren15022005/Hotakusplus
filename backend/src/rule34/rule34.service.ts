import { Injectable } from '@nestjs/common';
import { HentaiApiClientService } from '../common/hentai-api-client/hentai-api-client.service';
import { AutocompleteItem } from './interfaces/autocomplete-item.interface';
import { PaginatedResult } from './interfaces/paginated-result.interface';
import { ImageInfo } from './interfaces/image-info.interface';
import { MOCK } from '../common/mock.data';

@Injectable()
export class Rule34Service {
  constructor(private readonly apiClient: HentaiApiClientService) {}

  async autocomplete(query: string): Promise<AutocompleteItem[]> {
    try {
      return await this.apiClient.get<AutocompleteItem[]>(`/api/r34/autocomplete/${encodeURIComponent(query)}`);
    } catch {
      return MOCK.r34Autocomplete;
    }
  }

  async search(query: string): Promise<PaginatedResult> {
    try {
      return await this.apiClient.get<PaginatedResult>(`/api/r34/search/${encodeURIComponent(query)}`);
    } catch {
      return MOCK.r34Search;
    }
  }

  async getById(id: string): Promise<ImageInfo> {
    try {
      return await this.apiClient.get<ImageInfo>(`/api/r34/${encodeURIComponent(id)}`);
    } catch {
      return MOCK.r34Detail;
    }
  }
}
