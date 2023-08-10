import { Module } from '@nestjs/common';
import { GovernorateController } from './governorate.controller';
import { GovernorateService } from './governorate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Governorate } from './governorate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Governorate])],
  controllers: [GovernorateController],
  providers: [GovernorateService]
})
export class GovernorateModule {}
