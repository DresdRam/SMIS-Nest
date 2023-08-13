import { Module } from '@nestjs/common';
import { SoldierController } from './soldier.controller';
import { SoldierService } from './soldier.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Soldier } from './entity/soldier.entity';
import { Enrollment } from '../enrollment/entity/enrollment.entity';
import { NoteModule } from '../note/note.module';
import { EnrollmentModule } from '../enrollment/enrollment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Soldier, Enrollment]), NoteModule, EnrollmentModule],
  controllers: [SoldierController],
  providers: [SoldierService],
  exports: [SoldierService]
})
export class SoldierModule {}
