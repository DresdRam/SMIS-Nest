import { IsNumber, IsString } from "class-validator"
import { GovernorateDto } from "src/model/governorate/dto/governorate.dto";

export class AddressDto{

    @IsNumber()
    id: number;

    @IsString()
    city: string;
    
    @IsString()
    street: string;
    
    governorate: GovernorateDto;

}