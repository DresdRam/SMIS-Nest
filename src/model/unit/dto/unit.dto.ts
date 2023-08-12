import { IsNumber, IsOptional, IsString } from "class-validator";

export class UnitDto{

    @IsNumber()
    @IsOptional()
    code: number;

    @IsString()
    name: string;
}