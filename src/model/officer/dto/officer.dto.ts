import { IsNumber, IsString } from "class-validator";

export class OfficerDto{

    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    phone: string;

    @IsString()
    rank: string;

}