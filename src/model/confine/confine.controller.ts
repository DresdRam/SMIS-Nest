import { Controller, Get, Query, Post, Body, UseGuards } from '@nestjs/common';
import { ConfineService } from './confine.service';
import { CreateConfine } from './dto/createConfine.dto';
import { Roles } from 'src/common/enum/role.enum';
import { Role } from '../role/entity/role.entity';
import { RolesGuard } from 'src/common/guard/AuthorizationGuard.guard';

@UseGuards(RolesGuard([new Role(Roles.ADMIN), new Role(Roles.RATING)]))
@Controller('confine')
export class ConfineController {

    constructor(private confineService: ConfineService) { }

    @Get('/get-all')
    getAllConfines() {
        return this.confineService.findAll();
    }

    @Get('/get-confine')
    getSoldierConfine(@Query('national_id') national_id: string) {
        return this.confineService.findOne(parseInt(national_id));
    }

    @Get('/search')
    searchByName(@Query('name') name: string) {
        return this.confineService.searchByName(name);
    }

    @Post('/add-confine')
    addSoldierConfine(@Body() body: CreateConfine) {
        return this.confineService.create(body);
    }
}
