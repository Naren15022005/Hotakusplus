import { Injectable } from '@nestjs/common';
import { HentaiApiClientService } from '../common/hentai-api-client/hentai-api-client.service';
import { SearchResult } from './interfaces/search-result.interface';
import { Video } from './interfaces/video.interface';
import { Stream } from './interfaces/stream.interface';
import { MOCK } from '../common/mock.data';

@Injectable()
export class HanimeService {
  constructor(private readonly apiClient: HentaiApiClientService) {}

  async search(query: string): Promise<SearchResult[]> {
    try {
      const res = await this.apiClient.get<any>(`/api/hanime/search/${encodeURIComponent(query)}`);
      const list = Array.isArray(res) ? res : (res?.results || res);
      return Array.isArray(list) && list.length > 0 ? list : MOCK.hanimeSearch;
    } catch {
      return MOCK.hanimeSearch;
    }
  }

  async getBySlug(slug: string): Promise<Video> {
    try {
      return await this.apiClient.get<Video>(`/api/hanime/${encodeURIComponent(slug)}`);
    } catch {
      return MOCK.hanimeDetail;
    }
  }

  async getStreams(slug: string): Promise<Stream[]> {
    try {
      return await this.apiClient.get<Stream[]>(`/api/hanime/streams/${encodeURIComponent(slug)}`);
    } catch {
      return MOCK.hanimeStreams;
    }
  }
}
