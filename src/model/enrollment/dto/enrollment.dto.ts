import { IsNumber, IsOptional, IsString } from "class-validator";
import { UnitDto } from "src/model/unit/dto/unit.dto";

export class EnrollmentDto{

    @IsNumber()
    agenda_id: number;

    @IsString()
    holiday_group: string;

    @IsNumber()
    police_number: number;

    @IsString()
    join_camp_date: string;

    @IsString()
    enrollment_date: string;

    @IsString()
    quit_camp_date: string;

    @IsString()
    unit_enrollment_date: string;

    @IsString()
    @IsOptional()
    unit_job: string;

    @IsString()
    @IsOptional()
    unit_side_job: string;

    @IsString()
    @IsOptional()
    street_status: string;
    
    @IsString()
    enrollment_status: string;

    unit: UnitDto;
}