import { Controller, Get, Param } from '@nestjs/common';
import { HanimeService } from './hanime.service';

@Controller('api/hanime')
export class HanimeController {
  constructor(private readonly hanimeService: HanimeService) {}

  @Get('search/:query')
  search(@Param('query') query: string) {
    return this.hanimeService.search(query);
  }

  @Get('streams/:slug')
  getStreams(@Param('slug') slug: string) {
    return this.hanimeService.getStreams(slug);
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) {
    return this.hanimeService.getBySlug(slug);
  }
}
