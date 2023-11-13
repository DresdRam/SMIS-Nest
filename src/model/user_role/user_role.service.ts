import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './entity/user_role.entity';

@Injectable()
export class UserRoleService {

    constructor (@InjectRepository(UserRole) private readonly repository: Repository<UserRole>) {}

    async findAll(){
        return await this.repository.createQueryBuilder('ur')
        .select()
        .innerJoinAndSelect('ur.user', 'u', 'u.id = ur.user_id')
        .innerJoinAndSelect('ur.role', 'r', 'r.code = ur.role_code')
        .getMany()
    }

}
