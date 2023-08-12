import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"
import { NoteDto } from "src/model/note/dto/note.dto";

export class RatingDto{

    @IsNumber()
    nationalId: number;

    @IsString()
    rating: string;

    @IsBoolean()
    rating_status: boolean;

    @IsString()
    rating_type: string;

    notes: NoteDto[];
}