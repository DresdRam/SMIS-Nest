import { Controller, Get, Query } from '@nestjs/common';
import { GateService } from './gate.service';

@Controller('gate')
export class GateController {

    constructor(private gateService: GateService) { }

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

}
