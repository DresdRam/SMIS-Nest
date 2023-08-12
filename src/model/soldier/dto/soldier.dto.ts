import { IsString, IsNumber, IsBoolean, IsDate, isDate, IsOptional } from 'class-validator';
import { EnrollmentDto } from 'src/model/enrollment/dto/enrollment.dto';

export class SoldierDto {

    @IsString()
    name: string;

    @IsString()
    national_id: number;

    @IsString()
    birth_date: string;

    @IsString()
    education: string;

    @IsString()
    phone_number: string;

    @IsString()
    rating: string;

    @IsString()
    rating_type: string;

    @IsBoolean()
    rating_status: boolean;

    @IsString()
    religion: string;

    @IsBoolean()
    removed: boolean;

    @IsString()
    triple_digit_number: string;

    @IsString()
    medical_condition: string;

    @IsString()
    medical_condition_type: string;

    @IsString()
    job: string;

    @IsNumber()
    @IsOptional()
    status: number;

    @IsString()
    enrollment_date: string;

    @IsNumber()
    agenda_id: number;

    @IsString()
    enrollment_status: string;

    @IsString()
    holiday_group: string;

    @IsNumber()
    police_number: number;

    @IsString()
    join_camp_date: string

    @IsString()
    quit_camp_date: string;

    @IsString()
    unit_enrollment_date: string;

    @IsString()
    unit: string;

    @IsString()
    unit_job: string;

    @IsString()
    @IsOptional()
    street_status: string;

    @IsString()
    @IsOptional()
    unit_side_job: string;

    enrollment: EnrollmentDto;
}