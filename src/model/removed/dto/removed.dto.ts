import { IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";

export class RemovedDto{

    @IsString()
    date: string;

    @IsString()
    reason: string;

    @IsString()
    @ValidateIf((value) => value === null)
    returned_at: string | null = null;
}