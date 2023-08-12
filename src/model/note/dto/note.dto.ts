import { IsNumber, IsString } from "class-validator"

export class NoteDto{

    @IsString()
    category: string;

    @IsString()
    date: string;

    @IsString()
    note: string;
}