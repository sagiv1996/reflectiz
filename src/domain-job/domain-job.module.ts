import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DomainJobService } from './domain-job.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Domain, DomainSchema } from 'src/schemas/domain.schema';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({
      maxRedirects: 3,
      baseURL: process.env.WHO_IS_URL,
      params: {
        apiKey: process.env.WHO_IS_API_KEY,
        outputFormat: 'json',
      },
    }),
    MongooseModule.forFeature([{ name: Domain.name, schema: DomainSchema }]),
    ScheduleModule.forRoot(),
  ],
  providers: [DomainJobService],
})
export class DomainJobModule {}
