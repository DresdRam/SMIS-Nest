import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Removed } from './entity/removed.entity';
import { Repository } from 'typeorm';
import { RemovedDto } from './dto/removed.dto';
import { Soldier } from '../soldier/entity/soldier.entity';
import { SoldierService } from '../soldier/soldier.service';
import { format } from 'date-fns';

@Injectable()
export class RemovedService {

    private readonly current_date: string = format(new Date(), 'yyyy-MM-dd').toString();

    constructor(
        @InjectRepository(Removed) private readonly removedRepository: Repository<Removed>,
        private readonly soldierService: SoldierService) { }

    async create(id: number, removed: RemovedDto) {
        return await this.removedRepository
            .createQueryBuilder()
            .insert()
            .into(Removed)
            .values([{
                date: removed.date,
                reason: removed.reason,
                returned_at: removed.returned_at,
                soldier: {
                    id: id
                }
            }])
            .execute().then((results: any) => {
                return this.soldierService.setRemovedStatus(id, true, 1);
            });
    }

    async return(id: number) {
        return await this.removedRepository
            .createQueryBuilder()
            .update(Removed)
            .set({
                returned_at: this.current_date
            })
            .where('soldier_id = :soldier_id', { soldier_id: id })
            .orderBy('id', 'DESC')
            .limit(1)
            .execute().then((results: any) => {
                return this.soldierService.setRemovedStatus(id, false, 0);
            });
    }

}
