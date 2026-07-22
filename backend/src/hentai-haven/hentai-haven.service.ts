import { Injectable } from '@nestjs/common';
import { HentaiApiClientService } from '../common/hentai-api-client/hentai-api-client.service';
import { HentaiSearchResult } from './interfaces/hentai-search-result.interface';
import { HentaiInfo } from './interfaces/hentai-info.interface';
import { HentaiSourcesResponse } from './interfaces/hentai-source.interface';
import { MOCK } from '../common/mock.data';

@Injectable()
export class HentaiHavenService {
  constructor(private readonly apiClient: HentaiApiClientService) {}

  async search(query: string): Promise<HentaiSearchResult[]> {
    try {
      return await this.apiClient.get<HentaiSearchResult[]>(`/api/hh/search/${encodeURIComponent(query)}`);
    } catch {
      return MOCK.hhSearch;
    }
  }

  async getById(id: string): Promise<HentaiInfo> {
    try {
      return await this.apiClient.get<HentaiInfo>(`/api/hh/${encodeURIComponent(id)}`);
    } catch {
      return MOCK.hhDetail;
    }
  }

  async getSources(id: string): Promise<HentaiSourcesResponse> {
    try {
      return await this.apiClient.get<HentaiSourcesResponse>(`/api/hh/sources/${encodeURIComponent(id)}`);
    } catch {
      return MOCK.hhSources;
    }
  }
}
