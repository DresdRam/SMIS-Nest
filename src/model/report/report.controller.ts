import { Body, Controller, Get, Header, Query, Res, UseGuards } from '@nestjs/common';
import { LockerCardInputs } from './dto/lockerCardInputs.dto';
import { ReportService } from './report.service';
import { Response } from 'express';
import { ReadStream } from 'fs';
import { Roles } from 'src/common/enum/role.enum';
import { Role } from '../role/entity/role.entity';
import { RolesGuard } from 'src/common/guard/AuthorizationGuard.guard';

@UseGuards(RolesGuard([new Role(Roles.ADMIN), new Role(Roles.MANAGER)]))
@Controller('report')
export class ReportController {

    constructor(private reportService: ReportService) { }

    @Get('locker-card')
    @Header('Content-Type', 'application/pdf')
    @Header('Content-Disposition', 'attachment; filename="Locker_Card.pdf"')
    async generateLockerCard(@Query('national_id') national_id: number, @Query('locker_number') locker_number: string,@Query('bed_number') bed_number: string, @Res() res: Response) {

        const stream: ReadStream = await this.reportService.generateLockerCard(national_id, locker_number, bed_number);

        stream.pipe(res);
    }

    @Get('field-journal')
    @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    @Header('Content-Disposition', 'attachment; filename="Field Net Soldiers.xlsx"')
    async generateFieldJournal(@Res() res: Response) {
        
        //const stream: ReadStream = await this.reportService.generateFieldJournal();

        //stream.pipe(res);
    }

}
