import { Font, generate } from '@pdfme/generator';
import { readFileSync } from 'fs';
import { join } from 'path';
import { LockerCardInputs } from 'src/model/report/dto/lockerCardInputs.dto';

export class Pdf {

    static async generateLockerCard(lockerCardInputs: LockerCardInputs) {

        const templatePath: string = join(process.cwd(), 'data', 'template', 'Locker_Card_Template.json');
        //const fontPath: string = join(process.cwd(), 'data', 'fonts', 'Rubik-Italic.ttf');
        const fontPath: string = join(process.cwd(), 'data', 'fonts', 'Samim-Bold.ttf');

        const template = JSON.parse(readFileSync(templatePath, 'utf8'));

        const inputs = [{
            name: lockerCardInputs.name,
            unit: lockerCardInputs.unit,
            enrollment_date: lockerCardInputs.enrollment_date,
            quit_camp_date: lockerCardInputs.quit_camp_date,
            unit_job: lockerCardInputs.unit_job,
            phone_number: lockerCardInputs.phone_number,
            locker_number: lockerCardInputs.locker_number,
            bed_number: lockerCardInputs.bed_number
        }]

        const font: Font = {
            Roboto: {
                data: readFileSync(fontPath),
                fallback: true
            },
        };

        return await generate({ template, inputs: inputs, options: { font } })
    }

}