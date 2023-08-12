import { Injectable } from '@nestjs/common';
import { Note } from './entity/note.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryTypes } from 'src/common/enum/category.enum';
import { format } from 'date-fns';
import { NoteDto } from './dto/note.dto';

@Injectable()
export class NoteService {

    private readonly current_date: string = format(new Date(), 'yyyy-MM-dd').toString();

    constructor(@InjectRepository(Note) private readonly noteRepository: Repository<Note>) { }

    createNote(id: number, note: NoteDto) {

        const categoryId: number = (note.category) ? CategoryTypes[note.category] : 2;

        return this.noteRepository
            .createQueryBuilder()
            .insert()
            .into(Note)
            .values([{
                note: note.note,
                date: this.current_date,
                category: {
                    id: categoryId
                },
                soldier: {
                    id: id
                }
            }])
            .execute();
    }

    createNotes(id: number, notes: NoteDto[]) {
        return notes.forEach((note: NoteDto) => {

            const categoryId: number = (note.category) ? CategoryTypes[note.category] : 2;

            this.noteRepository
                .createQueryBuilder()
                .insert()
                .into(Note)
                .values([{
                    note: note.note,
                    date: this.current_date,
                    category: {
                        id: categoryId
                    },
                    soldier: {
                        id: id
                    }
                }])
                .execute();
        })
    }

    deleteNote(id: number) {
        return this.noteRepository
            .createQueryBuilder()
            .delete()
            .where('id = :id', { id: id })
            .execute();
    }

}
