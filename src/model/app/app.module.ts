import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Soldier } from '../soldier/entity/soldier.entity';
import { Address } from '../address/entity/address.entity';
import { Governorate } from '../governorate/entity/governorate.entity';
import { Card } from '../card/entity/card.entity';
import { Confine } from '../confine/entity/confine.entity';
import { Enrollment } from '../enrollment/entity/enrollment.entity';
import { GateLog } from '../gate/entity/gate.entity';
import { Unit } from '../unit/entity/unit.entity';
import { Note } from '../note/entity/note.entity';
import { Category } from '../category/entity/category.entity';
import { PhoneNumber } from '../phone/entity/phone.entity';
import { Removed } from '../removed/entity/removed.entity';
import { SoldierModule } from '../soldier/soldier.module';
import { AddressModule } from '../address/address.module';
import { GovernorateModule } from '../governorate/governorate.module';
import { CardModule } from '../card/card.module';
import { ConfineModule } from '../confine/confine.module';
import { EnrollmentModule } from '../enrollment/enrollment.module';
import { GateModule } from '../gate/gate.module';
import { UnitModule } from '../unit/unit.module';
import { NoteModule } from '../note/note.module';
import { CategoryModule } from '../category/category.module';
import { PhoneModule } from '../phone/phone.module';
import { RemovedModule } from '../removed/removed.module';
import { ImageModule } from '../image/image.module';
import { ReportModule } from '../report/report.module';
import { UserModule } from '../user/user.module';
import { User } from '../user/entity/user.entity';
import { Officer } from '../officer/entity/officer.entity';
import { OfficerModule } from '../officer/officer.module';
import { UserRoleModule } from '../user_role/user_role.module';
import { RoleModule } from '../role/role.module';
import { UserRole } from '../user_role/entity/user_role.entity';
import { Role } from '../role/entity/role.entity';
import { RolesMiddleware } from '../role/middleware/roles.middleware';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "smis",
    entities: [Soldier, Address, Governorate, Card, Confine, Enrollment, GateLog, Unit, Note, Category, PhoneNumber, Removed, User, Role, UserRole, Officer],
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
    ImageModule,
    ReportModule,
    UserModule,
    OfficerModule,
    UserRoleModule,
    RoleModule]
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RolesMiddleware).forRoutes('*')
  }

}
