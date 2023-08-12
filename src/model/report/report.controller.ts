import { Body, Controller, Get, Header, Res } from '@nestjs/common';
import { LockerCardInputs } from './dto/lockerCardInputs.dto';
import { ReportService } from './report.service';
import { Response } from 'express';
import { ReadStream } from 'fs';

@Controller('report')
export class ReportController {

    constructor(private reportService: ReportService) { }

    @Get('locker-card')
    @Header('Content-Type', 'application/pdf')
    @Header('Content-Disposition', 'attachment; filename="Locker_Card.pdf"')
    async generateLockerCard(@Body() body: LockerCardInputs, @Res() res: Response) {

        const stream: ReadStream = await this.reportService.generateLockerCard(body);

        stream.pipe(res);
    }

}
