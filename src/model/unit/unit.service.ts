import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from './entity/unit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnitService {

    constructor(@InjectRepository(Unit) private readonly unitRepository: Repository<Unit>) { }

    async findAll() {
        return await this.unitRepository
            .createQueryBuilder()
            .select()
            .getMany();
    }

}
