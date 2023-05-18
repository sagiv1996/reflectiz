import { Injectable } from '@nestjs/common';
import { CreateDomainDto } from './dto/create-domain.dto';
import { GetDomainDto } from './dto/get-domain.dto';

@Injectable()
export class DomainService {
  getObjectByDomain(getDomainDto: GetDomainDto) {
    return 'This is GET route.';
  }
  create(createDomainDto: CreateDomainDto) {
    return 'This is post route.';
  }
}
