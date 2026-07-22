import { Module } from '@nestjs/common';
import { HentaiHavenController } from './hentai-haven.controller';
import { HentaiHavenService } from './hentai-haven.service';

@Module({
  controllers: [HentaiHavenController],
  providers: [HentaiHavenService],
})
export class HentaiHavenModule {}
