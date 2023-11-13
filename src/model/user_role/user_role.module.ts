import { Module } from '@nestjs/common';
import { UserRoleService } from './user_role.service';
import { UserRoleController } from './user_role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './entity/user_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  providers: [UserRoleService],
  controllers: [UserRoleController]
})
export class UserRoleModule {}
