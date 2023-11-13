import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UnitService } from './unit.service';
import { Roles } from 'src/common/enum/role.enum';
import { Role } from '../role/entity/role.entity';
import { RolesGuard } from 'src/common/guard/AuthorizationGuard.guard';

@UseGuards(RolesGuard([new Role(Roles.ANYUSER)]))
@Controller('unit')
export class UnitController {

    constructor(private readonly unitService: UnitService) { }

    @Get('/get-all')
    getAllUnits(){
        return this.unitService.findAll();
    }

}
