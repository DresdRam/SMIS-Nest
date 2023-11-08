import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficerService } from './officer.service';
import { OfficerController } from './officer.controller';
import { Officer } from './entity/officer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Officer])],
  controllers: [OfficerController],
  providers: [OfficerService],
})
export class OfficerModule {}