import { Module } from '@nestjs/common';
import { RemovedService } from './removed.service';
import { RemovedController } from './removed.controller';
import { Removed } from './entity/removed.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoldierModule } from '../soldier/soldier.module';

@Module({
  imports: [TypeOrmModule.forFeature([Removed]), SoldierModule],
  providers: [RemovedService],
  controllers: [RemovedController]
})
export class RemovedModule {}
