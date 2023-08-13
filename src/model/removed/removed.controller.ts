import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { RemovedService } from './removed.service';
import { RemovedDto } from './dto/removed.dto';

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
