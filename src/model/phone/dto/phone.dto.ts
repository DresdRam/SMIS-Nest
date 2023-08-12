import { IsNumber, IsString } from "class-validator"

export class PhoneNumbersDto{

    @IsNumber()
    id: number;

    @IsString()
    phoneNumber: string;
    
}