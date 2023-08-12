import { Injectable } from '@nestjs/common';
import { LockerCardInputs } from './dto/lockerCardInputs.dto';
import { Pdf } from 'src/common/util/pdf.util';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ReportRepository } from './report.repository';

@Injectable()
export class ReportService {

    constructor(private reportRepository: ReportRepository){ }

    async generateLockerCard(body: LockerCardInputs) {

        const unit8Array = await Pdf.generateLockerCard(body);

        const outputPath = this.reportRepository.saveLockerCard(unit8Array)

        return createReadStream(outputPath);
    }

}
