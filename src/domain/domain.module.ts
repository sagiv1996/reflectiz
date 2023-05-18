import { Module } from '@nestjs/common';
import { DomainService } from './domain.service';
import { DomainController } from './domain.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Domain, DomainSchema } from 'src/schemas/domain.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Domain.name, schema: DomainSchema }]),
  ],
  controllers: [DomainController],
  providers: [DomainService],
})
export class DomainModule {}
