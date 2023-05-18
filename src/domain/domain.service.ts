import { Injectable } from '@nestjs/common';
import { CreateDomainDto } from './dto/create-domain.dto';
import { GetDomainDto } from './dto/get-domain.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Domain } from 'src/schemas/domain.schema';
import { Model } from 'mongoose';

@Injectable()
export class DomainService {
  constructor(@InjectModel(Domain.name) private domainModel: Model<Domain>) {}

  async getObjectByDomain(getDomainDto: GetDomainDto) {
    const { path } = getDomainDto;
    const domain = await this.domainModel.findOne({ path }).lean();
    if (domain) return domain;

    await this.create(getDomainDto as CreateDomainDto);
    return {
      msg: 'The domain was added to the database a few moments ago. Please try again later.',
    };
  }
  async create(createDomainDto: CreateDomainDto) {
    return await this.domainModel.create(createDomainDto);
  }
}
