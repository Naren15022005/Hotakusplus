import { Module } from '@nestjs/common';
import { Rule34Controller } from './rule34.controller';
import { Rule34Service } from './rule34.service';

@Module({
  controllers: [Rule34Controller],
  providers: [Rule34Service],
})
export class Rule34Module {}
