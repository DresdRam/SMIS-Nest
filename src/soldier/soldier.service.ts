import { SoldierDto } from "./dto/soldier.dto";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Soldier } from "./soldier.entity";

@Injectable()
export class SoldierService {

    constructor(@InjectRepository(Soldier) private soldierRepository: Repository<Soldier>) { }

    async findOne(id: number) {
        return await this.soldierRepository.findOne({ where: { id: id } });
    }

    async findOneBy(id: number) {
        return await this.soldierRepository.findOneBy({ id: id });
    }

    create(body: SoldierDto) {
        const soldier = this.soldierRepository.create({
            name: body.name,
            national_id: body.national_id,
            birth_date: body.birth_date,
            education: body.education,
            phone_number: body.phone_number,
            rating: body.rating,
            rating_type: body.rating_type,
            rating_status: body.rating_status,
            religion: body.religion,
            removed: body.removed,
            triple_digit_number: body.triple_digit_number,
            medical_condition: body.medical_condition,
            medical_condition_type: body.medical_condition_type,
            job: body.job,
            status: body.status
        });

        return this.soldierRepository.save(soldier);
    }
}