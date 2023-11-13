import { Body, Controller, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { RemovedService } from './removed.service';
import { RemovedDto } from './dto/removed.dto';
import { Roles } from 'src/common/enum/role.enum';
import { Role } from '../role/entity/role.entity';
import { RolesGuard } from 'src/common/guard/AuthorizationGuard.guard';

@UseGuards(RolesGuard([new Role(Roles.ADMIN), new Role(Roles.SEGELAT)]))
@Controller('removed')
export class RemovedController {

    constructor(private readonly removedService: RemovedService) { }

    @Post('remove-soldier')
    removeSoldier(@Query('id') id: number, @Body() removedDto: RemovedDto){
        return this.removedService.create(id, removedDto);
    }

    @Patch('return-soldier')
    returnSoldier(@Query('id') id: number){
        return this.removedService.return(id);
    }

}
