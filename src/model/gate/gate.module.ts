import { Module } from '@nestjs/common';
import { GateService } from './gate.service';
import { GateController } from './gate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GateLog } from './entity/gate.entity';
import { Soldier } from '../soldier/entity/soldier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GateLog, Soldier])],
  providers: [GateService],
  controllers: [GateController]
})
export class GateModule {}
