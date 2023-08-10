import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { query } from 'express';
import { createCard } from './dto/createCard.dto';
import { Soldier } from 'src/soldier/soldier.entity';
import { updateCard } from './dto/updateCard.dto';

@Injectable()
export class CardService {

    constructor(@InjectRepository(Card) private cardRepository: Repository<Card>) { }

    async findAll(){
        return await this.cardRepository
        .createQueryBuilder('c')
        .select([
            'c.id as id',
            's.name as  name',
            's.national_id as national_id',
            'c.uid as uid'
        ])
        .leftJoin('c.soldier', 's', 'c.soldier_id = s.id')
        .getRawMany();
    }

    async create(body: createCard){
        return this.cardRepository
        .createQueryBuilder()
        .insert()
        .into(Card)
        .values({
            uid: body.uid,
            soldier: {
                id: body.soldier_id
            }
        })
        .execute();
    }

    async update(body: updateCard){
        return this.cardRepository
        .createQueryBuilder()
        .update(Card)
        .set({
            uid: body.uid,
            soldier: {
                id: body.soldier_id
            }
        })
        .where('id = :id', { id: body.id })
        .execute();
    }

    async delete(id: number){
        return this.cardRepository
        .createQueryBuilder()
        .delete()
        .where('id = :id', { id: id })
        .execute();
    }

}
