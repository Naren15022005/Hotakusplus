import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HentaiApiClientModule } from './common/hentai-api-client/hentai-api-client.module';
import { HanimeModule } from './hanime/hanime.module';
import { HentaiHavenModule } from './hentai-haven/hentai-haven.module';
import { Rule34Module } from './rule34/rule34.module';
import { FrontendController } from './frontend.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HentaiApiClientModule,
    HanimeModule,
    HentaiHavenModule,
    Rule34Module,
  ],
  controllers: [FrontendController],
})
export class AppModule {}
