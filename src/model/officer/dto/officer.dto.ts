import { IsNumber, IsString } from "class-validator";
import { Ranks } from "src/common/enum/policeRanks.enum copy";

export class OfficerDto{

    @IsString()
    name: string;

    @IsString()
    phone: string;

    @IsString()
    rank: Ranks;

}