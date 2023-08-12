import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './entity/enrollment.entity';
import { Repository } from 'typeorm';
import { EnrollmentDto } from './dto/enrollment.dto';
import e from 'express';
import { UnitEnum } from 'src/common/enum/unit.enum';
import { error } from 'console';

@Injectable()
export class EnrollmentService {

    constructor(@InjectRepository(Enrollment) private readonly enrollmentRepository: Repository<Enrollment>) { }

    async create(enrollment: EnrollmentDto) {

        const unitId: number = (enrollment.unit.name) ? UnitEnum[enrollment.unit.name] : 1;

        return await this.enrollmentRepository
            .createQueryBuilder()
            .insert()
            .into(Enrollment)
            .values({
                enrollment_date: enrollment.enrollment_date,
                agenda_id: enrollment.agenda_id,
                enrollment_status: enrollment.enrollment_status,
                holiday_group: enrollment.holiday_group,
                police_number: enrollment.police_number,
                join_camp_date: enrollment.join_camp_date,
                quit_camp_date: enrollment.quit_camp_date,
                unit_enrollment_date: enrollment.unit_enrollment_date,
                unit_job: enrollment.unit_job,
                street_status: enrollment.street_status,
                unit_side_job: enrollment.unit_side_job,
                unit: {
                    code: unitId
                }
            })
            .execute()
    }

    async update(id: number, enrollment: EnrollmentDto) {

        const unit_code = (enrollment.unit.name) ? UnitEnum[enrollment.unit.name] : 1;

        return this.enrollmentRepository
            .createQueryBuilder()
            .update(Enrollment)
            .set({
                enrollment_date: enrollment.enrollment_date,
                agenda_id: enrollment.agenda_id,
                enrollment_status: enrollment.enrollment_status,
                holiday_group: enrollment.holiday_group,
                police_number: enrollment.police_number,
                join_camp_date: enrollment.join_camp_date,
                quit_camp_date: enrollment.quit_camp_date,
                unit_enrollment_date: enrollment.unit_enrollment_date,
                unit_job: enrollment.unit_job,
                street_status: enrollment.street_status,
                unit_side_job: enrollment.unit_side_job,
                unit: {
                    code: unit_code
                }
            })
            .where('soldier.id = :id', { id: id })
            .execute().then((results: any) => {
                if (results) {
                    return {
                        statusCode: 200,
                        message: "Updated Soldier Enrollment Successfully."
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

}
