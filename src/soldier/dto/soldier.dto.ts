import { IsString, IsNumber, IsBoolean, IsDate } from 'class-validator';

export class SoldierDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    national_id: number;

    @IsDate()
    birth_date: Date;

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

    @IsNumber()
    enrollment_id: number;

    @IsNumber()
    card_id: number;

    @IsString()
    medical_condition: string;

    @IsString()
    medical_condition_type: string;

    @IsString()
    job: string;

    @IsNumber()
    status: number;
}