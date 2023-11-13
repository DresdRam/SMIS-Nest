import { Controller, Get, Post, Body, Query, Res, Put, UseGuards } from '@nestjs/common';
import { SoldierService } from './soldier.service';
import { updateSoldierDto } from './dto/updateSoldier.dto';
import { RatingDto } from './dto/rating.dto';
import { SoldierDto } from './dto/soldier.dto';
import { Roles } from 'src/common/enum/role.enum';
import { Role } from '../role/entity/role.entity';
import { RolesGuard } from 'src/common/guard/AuthorizationGuard.guard';

@Controller('soldier')
export class SoldierController {

    constructor(private soldierService: SoldierService) { }

    @UseGuards(RolesGuard([new Role(Roles.ANYUSER)]))
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

    @UseGuards(RolesGuard([new Role(Roles.ANYUSER)]))
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

    @UseGuards(RolesGuard([new Role(Roles.ADMIN), new Role(Roles.SEGELAT)]))
    @Post('/add-soldier')
    addNewSoldier(@Body() body: SoldierDto) {
        return this.soldierService.create(body);
    }

    @UseGuards(RolesGuard([new Role(Roles.ADMIN), new Role(Roles.SEGELAT)]))
    @Put('/update-soldier')
    UpdateSolddier(@Query('id') id: number, @Body() body: updateSoldierDto) {
        return this.soldierService.updateSoldier(id, body);
    }

    @UseGuards(RolesGuard([new Role(Roles.ADMIN), new Role(Roles.RATING)]))
    @Put('/update-rating')
    UpdateSoldierRating(@Query('id') id: number, @Body() body: RatingDto) {
        return this.soldierService.updateSoldierRating(id, body);
    }

    @UseGuards(RolesGuard([new Role(Roles.ADMIN), new Role(Roles.MANDOOB)]))
    @Put('/update-job')
    UpdateSoldierJob(@Query('id') id: number, @Query('job') job: string) {
        return this.soldierService.updateSoldierJob(id, job);
    }

    @UseGuards(RolesGuard([new Role(Roles.ADMIN), new Role(Roles.MEDICAL)]))
    @Put('/update-medical')
    UpdateSoldierMedical(@Query('id') id: number, @Query('job') job: string) {
        return this.soldierService.updateSoldierJob(id, job);
    }
    
    @UseGuards(RolesGuard([new Role(Roles.ADMIN), new Role(Roles.SEGELAT)]))
    @Get('/soldier-removes')
    getAllSoldierRemoves(@Query('national_id') national_id: number) {
        return this.soldierService.findSoldierRemoves(national_id);
    }
}