import { IsNumber, IsString } from "class-validator";

export class createCard {

    @IsString()
    uid: string;

    @IsNumber()
    soldier_id: number;

}