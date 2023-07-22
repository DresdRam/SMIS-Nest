import { Test, TestingModule } from '@nestjs/testing';
import { GovernorateService } from './governorate.service';

describe('GovernorateService', () => {
  let service: GovernorateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GovernorateService],
    }).compile();

    service = module.get<GovernorateService>(GovernorateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
