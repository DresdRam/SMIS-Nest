import { Test, TestingModule } from '@nestjs/testing';
import { ConfineService } from './confine.service';

describe('ConfineService', () => {
  let service: ConfineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfineService],
    }).compile();

    service = module.get<ConfineService>(ConfineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
