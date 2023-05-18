import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DomainService } from './domain.service';
import { CreateDomainDto } from './dto/create-domain.dto';
import { GetDomainDto } from './dto/get-domain.dto';

@Controller('domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Get()
  getObjectByDomain(@Body() domainDto: GetDomainDto) {
    return this.domainService.getObjectByDomain(domainDto);
  }

  @Post()
  create(@Body() createDomainDto: CreateDomainDto) {
    return this.domainService.create(createDomainDto);
  }
}
