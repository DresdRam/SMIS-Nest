import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
    
    constructor (@InjectRepository(Role) private readonly repository: Repository<Role>) {}
    
    async findAll() {
        return await this.repository.createQueryBuilder('r')
        .select('r.role')
        .getMany()
    }
}
