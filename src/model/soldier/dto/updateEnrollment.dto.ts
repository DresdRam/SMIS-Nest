import { IsNumber, IsOptional, IsString } from "class-validator";
import { NoteDto } from "src/model/note/dto/note.dto";
import { UnitDto } from "src/model/unit/dto/unit.dto";

export class updateEnrollmentDto{
    @IsNumber()
    agendaId: number;

    @IsString()
    holidayGroup: string;

    @IsNumber()
    policeNumber: number;

    @IsString()
    @IsOptional()
    joinCampDate: string;

    @IsString()
    @IsOptional()
    enrollmentDate: string;

    @IsString()
    @IsOptional()
    quitCampDate: string;

    @IsString()
    @IsOptional()
    unitEnrollmentDate: string;

    @IsString()
    unitJob: string;

    @IsString()
    @IsOptional()
    unitSideJob: string;

    @IsString()
    streetStatus: string;
    
    @IsString()
    enrollmentStatus: string;

    unit: UnitDto;

    note: NoteDto;
}