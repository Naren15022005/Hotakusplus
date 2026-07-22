import { Controller, Get, Param } from '@nestjs/common';
import { Rule34Service } from './rule34.service';

@Controller('api/r34')
export class Rule34Controller {
  constructor(private readonly rule34Service: Rule34Service) {}

  @Get('autocomplete/:query')
  autocomplete(@Param('query') query: string) {
    return this.rule34Service.autocomplete(query);
  }

  @Get('search/:query')
  search(@Param('query') query: string) {
    return this.rule34Service.search(query);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.rule34Service.getById(id);
  }
}
