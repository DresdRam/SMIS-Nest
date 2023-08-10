import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Soldier } from './soldier/soldier.entity';
import { SoldierModule } from './soldier/soldier.module';
import { AddressModule } from './address/address.module';
import { GovernorateModule } from './governorate/governorate.module';
import { Address } from './address/address.entity';
import { Governorate } from './governorate/governorate.entity';
import { CardModule } from './card/card.module';
import { ConfineModule } from './confine/confine.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { GateModule } from './gate/gate.module';
import { UnitModule } from './unit/unit.module';
import { Card } from './card/card.entity';
import { Confine } from './confine/confine.entity';
import { Enrollment } from './enrollment/enrollment.entity';
import { GateLog } from './gate/gate.entity';
import { Unit } from './unit/unit.entity';
import { NoteModule } from './note/note.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';
import { Note } from './note/note.entity';
import { PhoneModule } from './phone/phone.module';
import { PhoneNumber } from './phone/phone.entity';
import { RemovedModule } from './removed/removed.module';
import { Removed } from './removed/removed.entity';
import { ImageModule } from './image/image.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "smis",
    entities: [Soldier, Address, Governorate, Card, Confine, Enrollment, GateLog, Unit, Note, Category, PhoneNumber, Removed],
    synchronize: false
  }),
  SoldierModule,
  AddressModule,
  GovernorateModule,
  CardModule,
  ConfineModule,
  EnrollmentModule,
  GateModule,
  UnitModule,
  NoteModule,
  CategoryModule,
  PhoneModule,
  RemovedModule,
  ImageModule]
})
export class AppModule { }
