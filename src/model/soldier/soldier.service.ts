import { CreateSoldierDto } from "./dto/createSoldier.dto";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Soldier } from "./entity/soldier.entity";
import { Normalize } from "src/common/util/normalize.util";
import { UnitEnum } from "src/common/enum/unit.enum";
import { updateSoldierDto } from "./dto/updateSoldier.dto";
import { Enrollment } from "../enrollment/entity/enrollment.entity";
import { Unit } from "../unit/entity/unit.entity";

@Injectable()
export class SoldierService {

    constructor(@InjectRepository(Soldier) private soldierRepository: Repository<Soldier>, @InjectRepository(Enrollment) private enrollmentRepository: Repository<Enrollment>, @InjectRepository(Unit) private unitRepository: Repository<Unit>) { }

    async findOne(id: number) {

        return await this.soldierRepository
            .createQueryBuilder('s')
            .innerJoinAndSelect('s.enrollment', 'e', 's.enrollment_id = e.id')
            .innerJoinAndSelect('s.address', 'a', 'a.soldier_id = s.id')
            .innerJoinAndSelect('s.phoneNumbers', 'p', 'p.soldier_id = s.id')
            .innerJoinAndSelect('e.unit', 'u', 'e.unit_code = u.code')
            .innerJoinAndSelect('a.governorate', 'g', 'g.code = a.governorate_code')
            .where('s.id = :id', { id: id })
            .andWhere("s.removed = 0")
            .getOne();
    }

    async findOneByNationalId(national_id: number) {
        return await this.soldierRepository
            .createQueryBuilder('s')
            .innerJoinAndSelect('s.enrollment', 'e', 's.enrollment_id = e.id')
            .innerJoinAndSelect('s.address', 'a', 'a.soldier_id = s.id')
            .innerJoinAndSelect('s.phoneNumbers', 'p', 'p.soldier_id = s.id')
            .innerJoinAndSelect('e.unit', 'u', 'e.unit_code = u.code')
            .innerJoinAndSelect('a.governorate', 'g', 'g.code = a.governorate_code')
            .where('s.national_id = :national_id', { national_id: national_id })
            .andWhere("s.removed = 0")
            .getOne();
    }

    async searchByName(nameQuery: string, page: number, size: number) {
        const normalizedName: string = Normalize.normalizeName(nameQuery)

        return await this.soldierRepository
            .createQueryBuilder('s')
            .innerJoinAndSelect('s.enrollment', 'e', 's.enrollment_id = e.id')
            .innerJoinAndSelect('s.address', 'a', 'a.soldier_id = s.id')
            .innerJoinAndSelect('s.phoneNumbers', 'p', 'p.soldier_id = s.id')
            .innerJoinAndSelect('e.unit', 'u', 'e.unit_code = u.code')
            .innerJoinAndSelect('a.governorate', 'g', 'g.code = a.governorate_code')
            .where('s.name LIKE :name', { name: `${normalizedName}%` })
            .andWhere("s.removed = 0")
            .skip(size * (page - 1))
            .take(size)
            .getMany();
    }

    async create(body: CreateSoldierDto) {

        body.name = Normalize.normalizeName(body.name);
        const unit_code = (body.unit) ? UnitEnum[body.unit] : 1;

        return await this.soldierRepository
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
                    code: unit_code
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
                        .then((results: any) => {
                            return {
                                statusCode: 200,
                                message: "Created Soldier Successfully."
                            }
                        })
                        .catch((error: any) => {
                            return {
                                statusCode: 400,
                                message: error.message
                            }
                        });
                }
            }).catch((error: any) => {
                return {
                    statusCode: 400,
                    message: error.message
                }
            });
    }

    async updateSoldier(body: updateSoldierDto) {
        body.name = Normalize.normalizeName(body.name);
        const unit_code = (body.enrollment.unit.name) ? UnitEnum[body.enrollment.unit.name] : 1;

        return await this.soldierRepository
            .createQueryBuilder()
            .update(Enrollment)
            .set({
                enrollment_date: body.enrollment.enrollment_date,
                agenda_id: body.enrollment.agenda_id,
                enrollment_status: body.enrollment.enrollment_status,
                holiday_group: body.enrollment.holiday_group,
                police_number: body.enrollment.police_number,
                join_camp_date: body.enrollment.join_camp_date,
                quit_camp_date: body.enrollment.quit_camp_date,
                unit_enrollment_date: body.enrollment.unit_enrollment_date,
                unit_job: body.enrollment.unit_job,
                street_status: body.enrollment.street_status,
                unit_side_job: body.enrollment.unit_side_job,
                unit: {
                    code: unit_code
                }
            })
            .execute().then((results) => {
                if (results) {
                    return this.soldierRepository
                        .createQueryBuilder()
                        .update(Soldier)
                        .set({
                            name: body.name,
                            national_id: body.national_id,
                            birth_date: body.birth_date,
                            education: body.education,
                            phone_number: body.phone_number,
                            religion: body.religion,
                            triple_digit_number: body.triple_digit_number,
                            job: body.job,
                            enrollment: {
                                id: results.raw.insertId
                            },
                        })
                        .execute()
                        .then((results: any) => {
                            return {
                                statusCode: 200,
                                message: "Created Soldier Successfully."
                            }
                        })
                        .catch((error: any) => {
                            return {
                                statusCode: 400,
                                message: error.message
                            }
                        });
                }
            }).catch((error: any) => {
                return {
                    statusCode: 400,
                    message: error.message
                }
            });
    }

    async updateSoldierEnrollment(body: any) {

    }

    async updateSoldierRating(body: any) {

    }
}