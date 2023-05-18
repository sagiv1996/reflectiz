import { Test, TestingModule } from '@nestjs/testing';
import { DomainJobService } from './domain-job.service';

describe('DomainJobService', () => {
  let service: DomainJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomainJobService],
    }).compile();

    service = module.get<DomainJobService>(DomainJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
