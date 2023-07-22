import { Test, TestingModule } from '@nestjs/testing';
import { GovernorateController } from './governorate.controller';

describe('GovernorateController', () => {
  let controller: GovernorateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GovernorateController],
    }).compile();

    controller = module.get<GovernorateController>(GovernorateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
