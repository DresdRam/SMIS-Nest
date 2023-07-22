import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { SoldierDto } from './dto/soldier.dto';
import { SoldierService } from './soldier.service';
import { Serialize } from '../interceptor/serialize.interceptor';

@Controller('soldier')
export class SoldierController {

    constructor(public soldierService: SoldierService) { }

    @Serialize(SoldierDto)
    @Get('/get-soldier')
    getSoldierById(@Query('id') id: string) {
        return this.soldierService.findOne(parseInt(id));
    }

    @Post('/add-soldier')
    addNewSoldier(@Body() body: SoldierDto) {
        //return this.soldierService.addNewSoldier(body);
    }

}
