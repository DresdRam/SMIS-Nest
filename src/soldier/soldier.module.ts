import { Module } from '@nestjs/common';
import { SoldierController } from './soldier.controller';
import { SoldierService } from './soldier.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Soldier } from './soldier.entity';
import { Enrollment } from 'src/enrollment/enrollment.entity';
import { Unit } from 'src/unit/unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Soldier, Enrollment, Unit])],
  controllers: [SoldierController],
  providers: [SoldierService]
})
export class SoldierModule {}
