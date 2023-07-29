import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Confine } from './confine.entity';
import { Repository } from 'typeorm';
import { CreateConfine } from './dto/createConfine.dto';
import { format } from 'date-fns';

@Injectable()
export class ConfineService {

    private current_date: string = format(new Date(), "yyyy-MM-dd")

    constructor(@InjectRepository(Confine) private confineRepository: Repository<Confine>) { }

    async findAll() {
        return this.confineRepository
            .createQueryBuilder()
            .select([
                'id',
                'soldier_id',
                'start_date',
                'end_date',
                'imprisoned',
                'reason',
                'prison_reason'
            ])
            .where(`end_date >= :current_date`, { current_date: this.current_date })
            .orWhere(`end_date is null`)
            .getRawMany();
    }

    async findOne(national_id: number) {
        return this.confineRepository
            .createQueryBuilder('c')
            .select([
                'c.id as id',
                'c.soldier_id as soldier_id',
                'c.start_date as start_date',
                'c.end_date as end_date',
                'c.imprisoned as imprisoned',
                'c.reason as reason',
                'c.prison_reason as prison_reason'
            ])
            .innerJoin('c.soldier', 's', 's.id = c.soldier_id')
            .where('s.national_id = :national_id', { national_id: national_id })
            .andWhere(`end_date >= :current_date`, { current_date: this.current_date })
            .orWhere(`end_date is null`)
            .orderBy('id', 'DESC')
            .getRawOne();
    }

    async delete(id: number) {
        return this.confineRepository
            .createQueryBuilder()
            .delete()
            .where('id = :id', { id: id })
            .execute();
    }

    async create(body: CreateConfine) {
        return this.confineRepository
            .createQueryBuilder()
            .insert()
            .into(Confine)
            .values({
                imprisoned: body.imprisoned,
                start_date: body.start_date,
                end_date: body.end_date,
                reason: body.reason,
                prison_reason: body.prison_reason,
                soldier: {
                    id: body.soldier_id,
                },
            })
            .execute();
    }

}
