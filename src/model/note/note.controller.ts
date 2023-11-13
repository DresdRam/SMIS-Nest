import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { NoteService } from './note.service';
import { Roles } from 'src/common/enum/role.enum';
import { Role } from '../role/entity/role.entity';
import { RolesGuard } from 'src/common/guard/AuthorizationGuard.guard';

@UseGuards(RolesGuard([new Role(Roles.ADMIN), new Role(Roles.RATING)]))
@Controller('note')
export class NoteController {

    constructor(private readonly noteService: NoteService) { }

    @Get('/delete')
    deleteNoteById(@Query('id') id: number){
        return this.noteService.deleteNote(id);
    }

}
