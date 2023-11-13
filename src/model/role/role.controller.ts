import { Controller, Get, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './entity/role.entity';
import { Roles } from 'src/common/enum/role.enum';
import { RolesGuard } from 'src/common/guard/AuthorizationGuard.guard';

@UseGuards(RolesGuard([new Role(Roles.ADMIN)]))
@Controller('role')
export class RoleController {

    constructor (private readonly roleService: RoleService) {}

    @Get('get-all')
    getAllRoles(){
        return this.roleService.findAll()
    }
}
