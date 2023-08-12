import { Controller, Get, Post, Body, Query, Res } from '@nestjs/common';
import { CreateSoldierDto } from './dto/createSoldier.dto';
import { SoldierService } from './soldier.service';

@Controller('soldier')
export class SoldierController {

    constructor(private soldierService: SoldierService) { }

    @Get('/get-soldier')
    getSoldier(@Query('id') id: number, @Query('national_id') national_id: number) {

        if (national_id) {
            return this.soldierService.findOneByNationalId(national_id);
        }
        else if (id) {
            return this.soldierService.findOne(id);
        }

        return {
            statusCode: 400,
            message: "Bad Params."
        }
    }

    @Get('/search')
    getSoldiersByName(@Body('name') name: string, @Query('page') page: number, @Query('size') size: number) {

        if (name && page && size) {
            return this.soldierService.searchByName(name, page, size);
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
