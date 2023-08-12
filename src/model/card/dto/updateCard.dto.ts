import { IsNumber, IsString, ValidateIf } from "class-validator";

export class updateCard {

    @IsNumber()
    id: number;

    @IsString()
    @ValidateIf((value) => value == null)
    uid: string | null;

    @IsNumber()
    @ValidateIf((value) => value == null)
    soldier_id: number | null;

}