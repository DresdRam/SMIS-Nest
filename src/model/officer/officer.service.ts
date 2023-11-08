import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Officer } from './entity/officer.entity';
import { Repository } from 'typeorm';
import { Normalize } from 'src/common/util/normalize.util';

@Injectable()
export class OfficerService {

  constructor(@InjectRepository(Officer) private readonly officerRepo: Repository<Officer>) { }

  async getOfficerData(id: number) {
    return await this.officerRepo.createQueryBuilder()
      .select()
      .where('id = :id', { id: id })
      .getOne()
  }

  async searchByName(nameQuery: string, page: number, size: number) {

    const normalizedName: string = Normalize.normalizeName(nameQuery)

    return await this.officerRepo
      .createQueryBuilder()
      .select()
      .where('name LIKE :name', { name: `${normalizedName}%` })
      .skip(size * (page - 1))
      .take(size)
      .getMany();
  }


}
