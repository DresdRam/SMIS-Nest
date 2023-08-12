import { Module } from '@nestjs/common';
import { SoldierController } from './soldier.controller';
import { SoldierService } from './soldier.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Soldier } from './entity/soldier.entity';
import { Enrollment } from '../enrollment/entity/enrollment.entity';
import { Unit } from '../unit/entity/unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Soldier, Enrollment, Unit])],
  controllers: [SoldierController],
  providers: [SoldierService]
})
export class SoldierModule {}
