import { CreateSoldierDto } from "./dto/createSoldier.dto";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Soldier } from "./soldier.entity";
import { Enrollment } from "src/enrollment/enrollment.entity";
import { Unit } from "src/unit/unit.entity";

@Injectable()
export class SoldierService {

    constructor(@InjectRepository(Soldier) private soldierRepository: Repository<Soldier>, @InjectRepository(Enrollment) private enrollmentRepository: Repository<Enrollment>, @InjectRepository(Unit) private unitRepository: Repository<Unit>) { }

    async findOne(id: number) {

        const soldier = await this.soldierRepository
            .createQueryBuilder('s')
            .select(this.soldierSelection)
            .innerJoin('s.enrollment', 'e', 's.enrollment_id = e.id')
            .innerJoin('e.unit', 'u', 'e.unit_code = u.code')
            .where('s.id = :id', { id: id })
            .andWhere("s.removed = 0")
            .getRawOne();

        if (soldier) {
            const removed_buffer = Buffer.from(soldier.removed);
            const rating_buffer = Buffer.from(soldier.rating_status);

            soldier.removed = Boolean(removed_buffer.readInt8());
            soldier.rating_status = Boolean(rating_buffer.readInt8());
        }

        return soldier;
    }

    async findOneByNationalId(national_id: number) {
        const soldier = await this.soldierRepository
            .createQueryBuilder('s')
            .select(this.soldierSelection)
            .innerJoin('s.enrollment', 'e', 's.enrollment_id = e.id')
            .innerJoin('e.unit', 'u', 'e.unit_code = u.code')
            .where('s.national_id = :national_id', { national_id: national_id })
            .andWhere("s.removed = 0")
            .getRawOne();

        if (soldier) {
            const removed_buffer = Buffer.from(soldier.removed);
            const rating_buffer = Buffer.from(soldier.rating_status);

            soldier.removed = Boolean(removed_buffer.readInt8());
            soldier.rating_status = Boolean(rating_buffer.readInt8());
        }

        return soldier;
    }

    async create(body: CreateSoldierDto) {

        return this.soldierRepository
            .createQueryBuilder()
            .insert()
            .into(Enrollment)
            .values({
                enrollment_date: body.enrollment_date,
                agenda_id: body.agenda_id,
                enrollment_status: body.enrollment_status,
                holiday_group: body.holiday_group,
                police_number: body.police_number,
                join_camp_date: body.join_camp_date,
                quit_camp_date: body.quit_camp_date,
                unit_enrollment_date: body.unit_enrollment_date,
                unit_job: body.unit_job,
                street_status: body.street_status,
                unit_side_job: body.unit_side_job,
                unit: {
                    code: 2
                }
            })
            .execute().then((enrollment) => {
                if (enrollment) {
                    return this.soldierRepository
                        .createQueryBuilder()
                        .insert()
                        .into(Soldier)
                        .values({
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
                            status: body.status,
                            enrollment: {
                                id: enrollment.raw.insertId
                            },
                        })
                        .execute()
                }
            });
    }

    soldierSelection = [
        's.id as id',
        's.birth_date as birth_date',
        's.education as education',
        's.name as name',
        's.national_id as national_id',
        's.phone_number as phone_number',
        's.rating as rating',
        's.rating_status as rating_status',
        's.religion as religion',
        's.removed as removed',
        's.triple_digit_number as triple_digit_number',
        's.card_id as card_id',
        's.rating_type as rating_type',
        's.medical_condition as medical_condition',
        's.job as job',
        's.medical_condition_type as medical_condition_type',
        's.status as status',
        'e.enrollment_date as enrollment_date',
        'e.agenda_id as agenda_id',
        'e.enrollment_status as enrollment_status',
        'e.holiday_group as holiday_group',
        'e.police_number as police_number',
        'e.join_camp_date as join_camp_date',
        'e.quit_camp_date as quit_camp_date',
        'e.unit_enrollment_date as unit_enrollment_date',
        'e.unit_job as unit_job',
        'e.street_status as street_status',
        'e.unit_side_job as unit_side_job',
        'u.name as unit']
}