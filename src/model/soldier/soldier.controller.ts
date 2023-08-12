import { Controller, Get, Post, Body, Query, Res, Put } from '@nestjs/common';
import { SoldierService } from './soldier.service';
import { updateSoldierDto } from './dto/updateSoldier.dto';
import { RatingDto } from './dto/rating.dto';
import { SoldierDto } from './dto/soldier.dto';

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
    addNewSoldier(@Body() body: SoldierDto) {
        return this.soldierService.create(body);
    }

    @Put('/update-soldier')
    UpdateSolddier(@Query('id') id: number, @Body() body: updateSoldierDto) {
        return this.soldierService.updateSoldier(id, body);
    }

    @Put('/update-rating')
    UpdateSoldierRating(@Query('id') id: number, @Body() body: RatingDto) {
        return this.soldierService.updateSoldierRating(id, body);
    }

    @Put('/update-job')
    UpdateSoldierJob(@Query('id') id: number, @Query('job') job: string) {
        return this.soldierService.updateSoldierJob(id, job);
    }

    @Put('/update-medical')
    UpdateSoldierMedical(@Query('id') id: number, @Query('job') job: string) {
        return this.soldierService.updateSoldierJob(id, job);
    }

}
