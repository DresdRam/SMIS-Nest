import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { ReportRepository } from './report.repository';
import { SoldierModule } from '../soldier/soldier.module';

@Module({
  providers: [ReportService, ReportRepository],
  controllers: [ReportController],
  imports: [SoldierModule]
})
export class ReportModule {}
