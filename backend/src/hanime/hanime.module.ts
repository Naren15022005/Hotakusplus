import { Module } from '@nestjs/common';
import { HanimeController } from './hanime.controller';
import { HanimeService } from './hanime.service';

@Module({
  controllers: [HanimeController],
  providers: [HanimeService],
})
export class HanimeModule {}
