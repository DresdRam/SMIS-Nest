import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Soldier } from "./entity/soldier.entity";
import { Normalize } from "src/common/util/normalize.util";
import { UnitEnum } from "src/common/enum/unit.enum";
import { updateSoldierDto } from "./dto/updateSoldier.dto";
import { RatingDto } from "./dto/rating.dto";
import { MedicalDto } from "./dto/medical.dto";
import { NoteService } from "../note/note.service";
import { EnrollmentService } from "../enrollment/enrollment.service";
import { SoldierDto } from "./dto/soldier.dto";

@Injectable()
export class SoldierService {

    constructor(
        @InjectRepository(Soldier) private soldierRepository: Repository<Soldier>,
        private readonly enrollmentService: EnrollmentService,
        private readonly noteService: NoteService) { }

    async findOne(id: number) {
        return await this.soldierRepository
            .createQueryBuilder('s')
            .innerJoinAndSelect('s.enrollment', 'e', 's.enrollment_id = e.id')
            .innerJoinAndSelect('s.address', 'a', 'a.soldier_id = s.id')
            .innerJoinAndSelect('s.phoneNumbers', 'p', 'p.soldier_id = s.id')
            .innerJoinAndSelect('e.unit', 'u', 'e.unit_code = u.code')
            .innerJoinAndSelect('a.governorate', 'g', 'g.code = a.governorate_code')
            .where('s.id = :id', { id: id })
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
            .getOne();
    }

    async findOneGateSoldier(national_id: number) {
        return await this.soldierRepository
            .createQueryBuilder('s')
            .select([
                's.id',
                's.name',
                's.national_id',
                's.phone_number',
                'e.police_number',
                'e.holiday_group',
                'e.enrollment_date',
                'u.name',
                's.qualification',
                'g.name',
                'e.unit_job',
                'n.id',
                'n.note',
                's.rating',
                's.rating_status',
                's.rating_type',
                's.medical_condition',
                's.medical_condition_type',
                's.removed'
            ])
            .innerJoin('s.enrollment', 'e', 's.enrollment_id = e.id')
            .innerJoinAndSelect('s.address', 'a', 'a.soldier_id = s.id')
            .innerJoin('s.phoneNumbers', 'p', 'p.soldier_id = s.id')
            .innerJoin('s.notes', 'n', 's.id = n.soldier_id')
            .innerJoin('e.unit', 'u', 'e.unit_code = u.code')
            .innerJoin('a.governorate', 'g', 'g.code = a.governorate_code')
            .where('s.national_id = :national_id', { national_id: national_id })
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

    async create(soldier: SoldierDto) {

        soldier.name = Normalize.normalizeName(soldier.name);

        return this.enrollmentService.create(soldier.enrollment).then((enrollment) => {
            if (enrollment) {
                return this.soldierRepository
                    .createQueryBuilder()
                    .insert()
                    .into(Soldier)
                    .values({
                        name: soldier.name,
                        national_id: soldier.national_id,
                        birth_date: soldier.birth_date,
                        education: soldier.education,
                        phone_number: soldier.phone_number,
                        rating: soldier.rating,
                        rating_type: soldier.rating_type,
                        rating_status: soldier.rating_status,
                        religion: soldier.religion,
                        removed: soldier.removed,
                        triple_digit_number: soldier.triple_digit_number,
                        medical_condition: soldier.medical_condition,
                        medical_condition_type: soldier.medical_condition_type,
                        job: soldier.job,
                        status: soldier.status,
                        enrollment: {
                            id: enrollment.raw.insertId
                        },
                    })
                    .execute()
                    .then((results: any) => {
                        if (results) {
                            return {
                                statusCode: 200,
                                message: "Created Soldier Successfully."
                            }
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

    async updateSoldier(id: number, soldier: updateSoldierDto) {
        soldier.name = Normalize.normalizeName(soldier.name);
        const unit_code = (soldier.enrollment.unit.name) ? UnitEnum[soldier.enrollment.unit.name] : 1;

        return this.soldierRepository
            .createQueryBuilder()
            .update(Soldier)
            .set({
                name: soldier.name,
                national_id: soldier.national_id,
                birth_date: soldier.birth_date,
                education: soldier.education,
                phone_number: soldier.phone_number,
                religion: soldier.religion,
                triple_digit_number: soldier.triple_digit_number,
                job: soldier.job,
                enrollment: {
                    enrollment_date: soldier.enrollment.enrollment_date,
                    agenda_id: soldier.enrollment.agenda_id,
                    enrollment_status: soldier.enrollment.enrollment_status,
                    holiday_group: soldier.enrollment.holiday_group,
                    police_number: soldier.enrollment.police_number,
                    join_camp_date: soldier.enrollment.join_camp_date,
                    quit_camp_date: soldier.enrollment.quit_camp_date,
                    unit_enrollment_date: soldier.enrollment.unit_enrollment_date,
                    unit_job: soldier.enrollment.unit_job,
                    street_status: soldier.enrollment.street_status,
                    unit_side_job: soldier.enrollment.unit_side_job,
                    unit: {
                        code: unit_code
                    }
                },
            })
            .where('id = :id', { id: id })
            .execute()
            .then((results: any) => {
                if (results) {
                    return {
                        statusCode: 200,
                        message: "Updated Soldier Successfully."
                    }
                }

                return {
                    statusCode: 404,
                    message: "Not Found."
                }
            }).catch((error: any) => {
                return {
                    statusCode: 400,
                    message: error.message
                }
            });
    }

    async updateSoldierRating(id: number, rating: RatingDto) {

        this.soldierRepository
            .createQueryBuilder()
            .update(Soldier)
            .set({
                rating: rating.rating,
                rating_status: rating.rating_status,
                rating_type: rating.rating_type
            })
            .where('id = :id', { id: id })
            .execute().then((results: any) => {
                if (results) {

                    this.noteService.createNotes(id, rating.notes);

                    return {
                        statusCode: 200,
                        message: "Updated Soldier Rating Successfully."
                    }
                }

                return {
                    statusCode: 404,
                    message: "Not Found."
                }
            }).catch((error: any) => {
                return {
                    statusCode: 400,
                    message: error.message
                }
            });;
    }

    async updateSoldierJob(id: number, job: string) {
        this.soldierRepository
            .createQueryBuilder()
            .update(Soldier)
            .set({
                job: job
            })
            .where('id = :id', { id: id })
            .execute().then((results: any) => {
                if (results) {
                    return {
                        statusCode: 200,
                        message: "Updated Soldier Job Successfully."
                    }
                }

                return {
                    statusCode: 404,
                    message: "Not Found."
                }
            }).catch((error: any) => {
                return {
                    statusCode: 400,
                    message: error.message
                }
            });;
    }

    async updateSoldierMedical(id: number, medical: MedicalDto) {
        this.soldierRepository
            .createQueryBuilder()
            .update(Soldier)
            .set({
                medical_condition: medical.medicalCondition,
                medical_condition_type: medical.medicalConditionType,
                rating_status: medical.ratingStatus
            })
            .where('id = :id', { id: id })
            .execute().then((results: any) => {
                if (results) {

                    this.noteService.createNote(id, medical.note);

                    return {
                        statusCode: 200,
                        message: "Updated Soldier Job Successfully."
                    }
                }

                return {
                    statusCode: 404,
                    message: "Not Found."
                }
            }).catch((error: any) => {
                return {
                    statusCode: 400,
                    message: error.message
                }
            });;
    }
    
    async findSoldierRemoves(national_id: number) {
        return await this.soldierRepository
            .createQueryBuilder('s')
            .select([
                's.name',
                's.national_id'
            ])
            .leftJoinAndSelect('s.removedHistory', 'r', 's.id = r.soldier_id')
            .where('s.national_id = :national_id', { national_id: national_id })
            .getOne()
    }

    async setRemovedStatus(id: number, removed: boolean, status: 1 | 0){
        return await this.soldierRepository
        .createQueryBuilder()
        .update(Soldier)
        .set({
            removed: removed,
            status: status
        })
        .where('id = :id', { id: id })
        .execute();``
    }

    async getSoldierLockerCard(national_id: number){
        return await this.soldierRepository.createQueryBuilder('s')
        .select([
            "s.name as name",
            "e.unit as unit",
            "e.enrollment_date as enrollment_date",
            "e.quit_camp_date as quit_camp_date",
            "e.unit_job as unit_job",
            "s.phone_number as phone_number"
        ])
        .innerJoinAndSelect('s.enrollment', 'e', 's.enrollment = e.id')
        .where('s.national_id = :national_id', { national_id: national_id })
        .getRawOne()
    }

}