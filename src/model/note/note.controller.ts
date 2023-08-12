import { Controller, Get, Query } from '@nestjs/common';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {

    constructor(private readonly noteService: NoteService) { }

    @Get('/delete')
    deleteNoteById(@Query('id') id: number){
        return this.noteService.deleteNote(id);
    }

}
