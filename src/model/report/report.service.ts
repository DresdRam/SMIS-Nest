import { Injectable } from '@nestjs/common';
import { LockerCardInputs } from './dto/lockerCardInputs.dto';
import { Pdf } from 'src/common/util/pdf.util';
import { createReadStream } from 'fs';
import { ReportRepository } from './report.repository';
import { SoldierService } from '../soldier/soldier.service';
import { format } from 'date-fns';
import { UnitEnum } from 'src/common/enum/unit.enum';

@Injectable()
export class ReportService {

    constructor(
        private reportRepository: ReportRepository,
        private soldierService: SoldierService
        ){ }

    async generateLockerCard(national_id: number, lockerNumber: string, bedNumber: string) {

        const soldierData = await this.soldierService.getSoldierLockerCard(national_id);
        const enrollment_date: string = format(soldierData.enrollment_date, 'yyyy-MM-dd');
        const quit_camp_date: string = format(soldierData.quit_camp_date, 'yyyy-MM-dd');
        const unit: string = soldierData.unit ? UnitEnum[soldierData.unit] : UnitEnum[1];

        let lockerCard = new LockerCardInputs();
        lockerCard.name = soldierData.name;
        lockerCard.unit = unit;
        lockerCard.enrollment_date = enrollment_date;
        lockerCard.quit_camp_date = quit_camp_date;
        lockerCard.unit_job = soldierData.unit_job;
        lockerCard.phone_number = soldierData.phone_number;
        lockerCard.bed_number = bedNumber;
        lockerCard.locker_number = lockerNumber;

        const unit8Array = await Pdf.generateLockerCard(lockerCard);

        const outputPath = this.reportRepository.saveLockerCard(unit8Array);

        return createReadStream(outputPath);
    }

    generateFieldJournal() {
        throw new Error('Method not implemented.');
        // Use Excel Util To Get The XLSX Workbook.
    }

}
