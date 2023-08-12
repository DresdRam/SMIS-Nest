import { IsOptional, IsString } from "class-validator";

export class LockerCardInputs{

    @IsString()
    name: string;

    @IsString()
    unit: string;

    @IsString()
    join_camp_date: string;

    @IsString()
    quit_camp_date: string;

    @IsString()
    unit_job: string;

    @IsString()
    phone_number: string;

    @IsString()
    @IsOptional()
    locker_number: string = "";

    @IsString()
    @IsOptional()
    bed_number: string = "";

}