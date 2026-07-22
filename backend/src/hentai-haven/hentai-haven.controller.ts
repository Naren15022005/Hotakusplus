import { Controller, Get, Param } from '@nestjs/common';
import { HentaiHavenService } from './hentai-haven.service';

@Controller('api/hh')
export class HentaiHavenController {
  constructor(private readonly hentaiHavenService: HentaiHavenService) {}

  @Get('search/:query')
  search(@Param('query') query: string) {
    return this.hentaiHavenService.search(query);
  }

  @Get('sources/:id')
  getSources(@Param('id') id: string) {
    return this.hentaiHavenService.getSources(id);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.hentaiHavenService.getById(id);
  }
}
