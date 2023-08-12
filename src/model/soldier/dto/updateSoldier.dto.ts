import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { AddressDto } from "src/model/address/dto/address.dto";
import { EnrollmentDto } from "src/model/enrollment/dto/enrollment.dto";
import { PhoneNumbersDto } from "src/model/phone/dto/phone.dto";

export class updateSoldierDto{

    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsNumber()
    national_id: number;

    @IsString()
    birth_date: string;

    @IsString()
    education: string;

    @IsString()
    qualification: string;

    @IsString()
    religion: string;

    @IsString()
    phone_number: string;

    @IsString()
    triple_digit_number: string;

    @IsString()
    job: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;

    enrollment: EnrollmentDto;

    addresses: AddressDto[];
    
    phoneNumbers: PhoneNumbersDto[]

}