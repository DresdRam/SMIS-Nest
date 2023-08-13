import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) { }

    async findAll(){
        return await this.categoryRepository
        .createQueryBuilder()
        .select()
        .getMany();
    }

    async create(category: CategoryDto){
        return await this.categoryRepository
        .createQueryBuilder()
        .insert()
        .into(Category)
        .values([{
            name: category.name
        }])
        .execute();
    }

    async delete(id: number){
        return await this.categoryRepository
        .createQueryBuilder()
        .delete()
        .where('id = :id', { id: id })
        .execute();
    }

    async findOne(id: number){
        return await this.categoryRepository
        .createQueryBuilder()
        .select()
        .where('id = :id', { id: id })
        .getOne();
    }

    async update(id: number, category: CategoryDto){
        return await this.categoryRepository
        .createQueryBuilder()
        .update(Category)
        .set({
            name: category.name
        })
        .where('id = :id', { id: id })
        .execute();
    }

}
