import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Domain } from 'src/schemas/domain.schema';

@Injectable()
export class DomainJobService {
  constructor(@InjectModel(Domain.name) private domainModel: Model<Domain>) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron() {
    const domains = await this.domainModel.find();
    console.debug('Executing cron job...');
    // Add your custom logic here
  }
}
