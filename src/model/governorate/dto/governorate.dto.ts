import { IsNumber, IsString } from "class-validator"

export class GovernorateDto {

    @IsNumber()
    code: number;

    @IsString()
    name: string;

}