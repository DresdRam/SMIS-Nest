import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserRoleService } from './user_role.service';
import { Roles } from 'src/common/enum/role.enum';
import { Role } from '../role/entity/role.entity';
import { RolesGuard } from 'src/common/guard/AuthorizationGuard.guard';

@UseGuards(RolesGuard([new Role(Roles.ADMIN)]))
@Controller('user-role')
export class UserRoleController {

    constructor (private readonly userRoleService: UserRoleService) {}

    @Get('get-all')
    getAlllUserRoles(){
        return this.userRoleService.findAll()
    }

}
