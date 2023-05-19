import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { Domain, DomainDocument } from 'src/schemas/domain.schema';

@Injectable()
export class DomainJobService {
  httpServiceWhoIs: HttpService;
  httpServiceTotalVirus: HttpService;

  constructor(@InjectModel(Domain.name) private domainModel: Model<Domain>) {
    this.httpServiceWhoIs = new HttpService(
      axios.create({
        baseURL: process.env.WHO_IS_URL,
        params: {
          apiKey: process.env.WHO_IS_API_KEY,
          outputFormat: 'json',
        },
      }),
    );

    this.httpServiceTotalVirus = new HttpService(
      axios.create({
        baseURL: process.env.TOTAL_VIRUS_URL,
        headers: {
          'x-apikey': process.env.TOTAL_VIRUS_API_KEY,
        },
      }),
    );
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async updateNewDomains() {
    console.debug('Executing cron job...');
    const domains = await this.domainModel.find({
      virusTotal: null,
      whoIs: null,
    });
    console.debug(`Found ${domains.length} domains to update.`);

    const updatePromisesArray = this.updateDomainRecords(domains);

    await Promise.allSettled(updatePromisesArray);
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async updateExistsDomains() {
    console.debug('Executing cron job...');
    const domains = await this.domainModel.find();
    console.debug(`Found ${domains.length} domains to update.`);

    const updatePromisesArray = this.updateDomainRecords(domains);

    await Promise.allSettled(updatePromisesArray);
  }

  private updateDomainRecords(domains: DomainDocument[]) {
    const updatePromisesArray = [];
    for (const domain of domains) {
      updatePromisesArray.push(this.updateDomainRecord(domain));
    }
    return updatePromisesArray;
  }

  private async updateDomainRecord(domain: DomainDocument) {
    const { data: virusTotal, status: statusVirusTotal } =
      await this.getDataFromTotalVirus(domain.path);
    const { data: whoIs, status: statusWhoIs } = await this.getDataFromWhoIs(
      domain.path,
    );

    if (statusVirusTotal === 200) {
      domain.virusTotal = virusTotal;
    }

    if (statusWhoIs === 200) {
      domain.whoIs = whoIs;
    }

    await domain.save();
  }

  private async getDataFromTotalVirus(path: string) {
    const response = this.httpServiceTotalVirus.get(`/${path}`);
    return firstValueFrom(response);
  }

  private async getDataFromWhoIs(path: string) {
    const response = this.httpServiceWhoIs.get('', {
      params: {
        domainName: path,
      },
    });
    return firstValueFrom(response);
  }
}
