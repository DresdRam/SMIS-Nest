import { Test, TestingModule } from '@nestjs/testing';
import { ConfineController } from './confine.controller';

describe('ConfineController', () => {
  let controller: ConfineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfineController],
    }).compile();

    controller = module.get<ConfineController>(ConfineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
