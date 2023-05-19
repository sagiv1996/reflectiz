import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AxiosResponse } from 'axios';
import { query } from 'express';
import { Model } from 'mongoose';
import { Observable, firstValueFrom } from 'rxjs';
import { Domain, DomainDocument } from 'src/schemas/domain.schema';

@Injectable()
export class DomainJobService {
  constructor(
    @InjectModel(Domain.name) private domainModel: Model<Domain>,
    private readonly httpService: HttpService,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async updateNewDomains() {
    console.debug('Executing cron job...');
    const domains = await this.domainModel.find({
      virusTotal: null,
      whoIs: null,
    });
    console.debug(`Found ${domains.length} domains to update.`);

    const updatePromisesArray = [];

    for (const domain of domains) {
      updatePromisesArray.push(this.updateWhoIs(domain));
    }

    await Promise.allSettled(updatePromisesArray);
  }

  private async getDataFromWhoIs(path: string) {
    const response = this.httpService.get('', {
      params: {
        domainName: path,
      },
    });
    return firstValueFrom(response);
  }

  private async updateWhoIs(domain: DomainDocument) {
    const { data } = await this.getDataFromWhoIs(domain.path);
    domain.whoIs = data;
    await domain.save();
  }
}
