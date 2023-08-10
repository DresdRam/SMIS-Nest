import { Controller, Get, Post, Body, Query, Res } from '@nestjs/common';
import { CreateSoldierDto } from './dto/createSoldier.dto';
import { SoldierService } from './soldier.service';
import { Serialize } from '../interceptor/serialize.interceptor';
import { createReadStream } from 'fs';
import { existsSync } from 'fs';
import { join } from 'path';
import type { Response } from 'express';

@Controller('soldier')
export class SoldierController {

    constructor(private soldierService: SoldierService) { }

    @Get('/get-soldier')
    getSoldier(@Query('id') id: string, @Query('national_id') national_id: string) {

        if (national_id) {
            return this.soldierService.findOneByNationalId(parseInt(national_id));
        }
        else if (id) {
            return this.soldierService.findOne(parseInt(id));
        }

        return {
            statusCode: 400,
            message: "Bad Params."
        }
    }

    @Get('/search')
    getSoldiersByName(@Query('name') name: string) {

        if (name) {
            return this.soldierService.searchByName(name);
        }

        return {
            statusCode: 400,
            message: "Bad Params."
        }
    }

    @Post('/add-soldier')
    addNewSoldier(@Body() body: CreateSoldierDto) {
        return this.soldierService.create(body);
    }

}
