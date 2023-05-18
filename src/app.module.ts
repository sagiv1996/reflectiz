import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DomainJobModule } from './domain-job/domain-job.module';
@Module({
  imports: [
    DomainModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    ScheduleModule.forRoot(),
    DomainJobModule,
  ],
  controllers: [AppController],
  providers: [AppService, DomainJobModule],
})
export class AppModule {}
