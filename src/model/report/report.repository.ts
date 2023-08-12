import { writeFileSync } from "fs";
import { join } from "path";

export class ReportRepository{

    saveLockerCard(unit8Array: Uint8Array){

        const outputPath: string = join(process.cwd(), 'data', 'generated', 'Locker_Card.pdf');

        writeFileSync(outputPath, unit8Array, 'utf8');

        return outputPath;
    }

}