import { Module } from '@nestjs/common';
import { GovernorateController } from './governorate.controller';
import { GovernorateService } from './governorate.service';

@Module({
  controllers: [GovernorateController],
  providers: [GovernorateService]
})
export class GovernorateModule {}
