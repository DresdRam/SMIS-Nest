import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"
import { NoteDto } from "src/model/note/dto/note.dto";

export class UpdateRatingDto{

    @IsNumber()
    nationalId: number;

    @IsString()
    rating: string;

    @IsBoolean()
    ratingStatus: string;

    @IsString()
    ratingType: string;

    notes: NoteDto[];
}