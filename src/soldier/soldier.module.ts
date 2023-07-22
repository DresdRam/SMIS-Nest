import { Module } from '@nestjs/common';
import { SoldierController } from './soldier.controller';
import { SoldierService } from './soldier.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Soldier } from './soldier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Soldier])],
  controllers: [SoldierController],
  providers: [SoldierService]
})
export class SoldierModule {}
