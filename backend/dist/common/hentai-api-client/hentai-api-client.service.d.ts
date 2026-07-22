import { ConfigService } from '@nestjs/config';
export declare class HentaiApiClientService {
    private readonly configService;
    private readonly client;
    constructor(configService: ConfigService);
    private buildHeaders;
    get<T>(path: string): Promise<T>;
}
