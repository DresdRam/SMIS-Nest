import { Font, generate } from '@pdfme/generator';
import { ReadStream, createReadStream, readFileSync, writeFile, writeFileSync } from 'fs';
import { join } from 'path';
import { LockerCardInputs } from 'src/model/report/dto/lockerCardInputs.dto';

export class Pdf {

    static async generateLockerCard(lockerCardInputs: LockerCardInputs) {

        const templatePath: string = join(process.cwd(), 'data', 'template', 'Locker_Card_Template.json');
        const fontPath: string = join(process.cwd(), 'data', 'fonts', 'Rubik-Italic.ttf');

        const template = JSON.parse(readFileSync(templatePath, 'utf8'));

        const inputs = [{
            name: lockerCardInputs.name,
            unit: lockerCardInputs.unit,
            join_camp_date: lockerCardInputs.join_camp_date,
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