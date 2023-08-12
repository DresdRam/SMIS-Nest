import { Module } from '@nestjs/common';
import { SoldierController } from './soldier.controller';
import { SoldierService } from './soldier.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Soldier } from './entity/soldier.entity';
import { Enrollment } from '../enrollment/entity/enrollment.entity';
import { NoteModule } from '../note/note.module';

@Module({
  imports: [TypeOrmModule.forFeature([Soldier, Enrollment]), NoteModule],
  controllers: [SoldierController],
  providers: [SoldierService]
})
export class SoldierModule {}
