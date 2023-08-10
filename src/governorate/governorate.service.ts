import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Governorate } from './governorate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GovernorateService {

    constructor(@InjectRepository(Governorate) private governorateRepository: Repository<Governorate>){ }

    async findAll(){
        return await this.governorateRepository
        .createQueryBuilder()
        .select([
            'code',
            'name as governorate'
        ])
        .getRawMany();
    }

}
