import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CreateSoldierDto } from './dto/createSoldier.dto';
import { SoldierService } from './soldier.service';
import { Serialize } from '../interceptor/serialize.interceptor';

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

    @Post('/add-soldier')
    addNewSoldier(@Body() body: CreateSoldierDto) {
        return this.soldierService.create(body);
    }

}
