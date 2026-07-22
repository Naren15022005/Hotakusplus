import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HentaiApiClientService } from './hentai-api-client.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [HentaiApiClientService],
  exports: [HentaiApiClientService],
})
export class HentaiApiClientModule {}
