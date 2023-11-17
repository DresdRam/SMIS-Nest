import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { GateService } from './gate.service';
import { SoldierService } from '../soldier/soldier.service';
import { CreateNLogs } from './dto/createNLogs.dto';
import { Roles } from 'src/common/enum/role.enum';
import { Role } from '../role/entity/role.entity';
import { RolesGuard } from 'src/common/guard/AuthorizationGuard.guard';

@UseGuards(RolesGuard([new Role(Roles.ADMIN), new Role(Roles.MANAGER), new Role(Roles.GATE)]))
@Controller('gate')
export class GateController {

    constructor(private readonly gateService: GateService, private readonly soldierService: SoldierService) { }

    @Get('/soldier-logs')
    getSoldierLogs(@Query('national_id') national_id: string, @Query('type') type: string, @Query('date') date: string) {
        
        if (national_id && type && date) {
            return this.gateService.findSoldierLogsNTD(parseInt(national_id), type, date);
        } else if (national_id && type) {
            return this.gateService.findSoldierLogsNT(parseInt(national_id), type);
        } else if (national_id && date) {
            return this.gateService.findSoldierLogsND(parseInt(national_id), date);
        } else if (national_id) {
            return this.gateService.findSoldierLogsN(parseInt(national_id));
        }

        return {
            statusCode: 400,
            message: "Bad Params."
        }
    }

    @Get('/get-soldier')
    getGateSoldier(@Query('national_id') national_id: number) {

        if (national_id) {
            return this.soldierService.findOneGateSoldier(national_id);
        }

        return {
            statusCode: 400,
            message: "Bad Params."
        }
    }

    @Get('/get-all')
    getAllLogs(@Query('page') page: number = 1, @Query('size') size: number = 20) {

        if (page && size) {
            return this.gateService.findManyLogs(page, size);
        }

        return {
            statusCode: 400,
            message: "Bad Params."
        }
    }

    @Get('/last-log')
    getSoldierLastLogs(@Query('national_id') national_id: string) {
        if (national_id) {
            return this.gateService.findSoldierLastLogs(parseInt(national_id))
        }

        return {
            statusCode: 400,
            message: "Bad Params."
        }
    }

    @Post('/n-logs')
    CreateNLogs(@Body() body: CreateNLogs) {
        if (body) {
            return this.gateService.createNLogs(body)
        }

        return {
            statusCode: 400,
            message: "Bad Params."
        }
    }

}
