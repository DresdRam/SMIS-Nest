import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateLog {

    @IsString()
    date: string;

    @IsString()
    type: string;

    @IsNumber()
    soldier_id: number;

    @IsNumber()
    sub_type: number;

    @IsString()
    section: string;

    @IsBoolean()
    overtime: boolean;

    @IsString()
    time_section: string;
}