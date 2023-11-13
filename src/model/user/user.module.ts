import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from '../role/role.module';
import { jwtConstants } from './constants/jwt.constants';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Role } from '../role/entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
  }), RoleModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
