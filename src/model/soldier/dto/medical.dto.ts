import { IsBoolean, IsString } from "class-validator";
import { NoteDto } from "src/model/note/dto/note.dto";

export class MedicalDto {

    @IsString()
    medicalCondition: string;

    @IsString()
    medicalConditionType: string;

    @IsBoolean()
    ratingStatus: boolean;

    note: NoteDto;
}