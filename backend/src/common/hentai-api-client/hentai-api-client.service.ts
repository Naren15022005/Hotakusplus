import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class HentaiApiClientService {
  private readonly client: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.client = axios.create({
      baseURL: this.configService.get<string>('HENTAI_API_BASE_URL', 'http://localhost:3000'),
      timeout: 10000,
      headers: this.buildHeaders(),
    });
  }

  private buildHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};
    const apiKey = this.configService.get<string>('HENTAI_API_KEY');
    if (apiKey) {
      headers['x-api-key'] = apiKey;
    }
    return headers;
  }

  async get<T>(path: string): Promise<T> {
    const response = await this.client.get<T>(path, { timeout: 5000 });
    return response.data;
  }
}
