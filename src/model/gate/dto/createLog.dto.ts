import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateLog {

    @IsString()
    date: string;

    @IsString()
    type: string;

    @IsNumber()
    soldier_id: number;

    @IsString()
    sub_type: string;

    @IsString()
    section: string = "غير محدد";

    @IsBoolean()
    overtime: boolean = false;

    @IsString()
    time_section: string;
}