import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GateLog } from './gate.entity';
import { Repository } from 'typeorm';
import { Soldier } from 'src/soldier/soldier.entity';
import { SoldierLogs } from './dto/soldierLogs.dto';
import { format } from 'date-fns';
import { CreateLog } from './dto/createLog.dto';
import { GateSubTypes } from 'src/enum/gateSubtypes.enum';

@Injectable()
export class GateService {

    constructor(@InjectRepository(GateLog) private gateRepository: Repository<GateLog>, @InjectRepository(Soldier) private soldierRepository: Repository<Soldier>) { }

    async findSoldierLogsN(national_id: number) {
        return this.reformSoldierLogs(await this.gateRepository
            .createQueryBuilder('g')
            .select([
                'g.id as id',
                'g.date as date',
                'g.type as type',
                'g.soldier_id as soldier_id',
                'g.sub_type as sub_type',
                'g.section as section',
                'g.overtime as overtime',
                'g.time_section as time_section'
            ])
            .innerJoin('g.soldier', 's', 'g.soldier_id = s.id')
            .where('s.national_id = :national_id', { national_id: national_id })
            .getRawMany());
    }

    async findSoldierLogsNT(national_id: number, type: string) {
        return this.reformSoldierLogs(await this.gateRepository
            .createQueryBuilder('g')
            .select([
                'g.id as id',
                'g.date as date',
                'g.type as type',
                'g.soldier_id as soldier_id',
                'g.sub_type as sub_type',
                'g.section as section',
                'g.overtime as overtime',
                'g.time_section as time_section'
            ])
            .innerJoin('g.soldier', 's', 'g.soldier_id = s.id')
            .where('s.national_id = :national_id', { national_id: national_id })
            .andWhere('g.type = :type', { type: type })
            .getRawMany());
    }

    async findSoldierLogsND(national_id: number, date: string) {

        const format_date = format(new Date(date), 'yyyy-MM-dd');
        const start_date = format_date.toString().concat(" 00:00:00.000000");
        const end_date = format_date.toString().concat(" 23:59:59.9999999");

        return this.reformSoldierLogs(await this.gateRepository
            .createQueryBuilder('g')
            .select([
                'g.id as id',
                'g.date as date',
                'g.type as type',
                'g.soldier_id as soldier_id',
                'g.sub_type as sub_type',
                'g.section as section',
                'g.overtime as overtime',
                'g.time_section as time_section'
            ])
            .innerJoin('g.soldier', 's', 'g.soldier_id = s.id')
            .where('s.national_id = :national_id', { national_id: national_id })
            .andWhere('g.date >= :start_date', { start_date: start_date })
            .orWhere('g.date <= :end_date', { end_date: end_date })
            .getRawMany());
    }

    async findSoldierLogsNTD(national_id: number, type: string, date: string) {

        const format_date = format(new Date(date), 'yyyy-MM-dd');
        const start_date = format_date.toString().concat(" 00:00:00.000000");
        const end_date = format_date.toString().concat(" 23:59:59.9999999");

        return this.reformSoldierLogs(await this.gateRepository
            .createQueryBuilder('g')
            .select([
                'g.id as id',
                'g.date as date',
                'g.type as type',
                'g.soldier_id as soldier_id',
                'g.sub_type as sub_type',
                'g.section as section',
                'g.overtime as overtime',
                'g.time_section as time_section'
            ])
            .innerJoin('g.soldier', 's', 'g.soldier_id = s.id')
            .where('s.national_id = :national_id', { national_id: national_id })
            .andWhere('g.type = :type', { type: type })
            .andWhere('g.date >= :start_date', { start_date: start_date })
            .orWhere('g.date <= :end_date', { end_date: end_date })
            .getRawMany());
    }

    async findSoldierLastLogs(national_id: number) {
        return await this.gateRepository
            .createQueryBuilder('g')
            .select([
                'g.id as id',
                'g.date as date',
                'g.type as type',
                'g.soldier_id as soldier_id',
                'g.sub_type as sub_type',
                'g.section as section',
                'g.overtime as overtime',
                'g.time_section as time_section'
            ])
            .innerJoin('g.soldier', 's', 'g.soldier_id = s.id')
            .where('s.national_id = :national_id', { national_id: national_id })
            .orderBy('g.id', "DESC")
            .getRawOne();
    }

    async createLog(body: CreateLog) {

        const subtype: number = (body.sub_type) ? GateSubTypes[body.sub_type] : 6;

        return await this.gateRepository
            .createQueryBuilder()
            .insert()
            .into(GateLog)
            .values({
                date: body.date,
                type: body.type,
                sub_type: subtype,
                section: body.section,
                time_section: body.time_section,
                overtime: body.overtime,
                soldier: {
                    id: body.soldier_id
                }
            })
            .execute();
    }

    async deleteLog(id: number) {
        return await this.gateRepository
            .createQueryBuilder()
            .delete()
            .from(GateLog)
            .where('id = :id', { id: id })
            .execute();
    }

    async updateOvertime(id: number, overtime: boolean) {
        return await this.gateRepository
            .createQueryBuilder()
            .update(GateLog)
            .set({ overtime: overtime })
            .where('id = :id', { id: id })
            .execute();
    }

    private reformSoldierLogs(soldierLogs: GateLog[]) {
        let totalIn = 0;
        let totalOut = 0;

        soldierLogs.forEach(log => {
            if (log.type == "دخول") {
                totalIn++;
            } else {
                totalOut++;
            }
        });

        const result: SoldierLogs = new SoldierLogs();

        result.totalIn = totalIn;
        result.totalOut = totalOut;
        result.logs = soldierLogs;

        return result;
    }
}
