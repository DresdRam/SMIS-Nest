import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ConfineService } from './confine.service';
import { CreateConfine } from './dto/createConfine.dto';

@Controller('confine')
export class ConfineController {

    constructor(private confineService: ConfineService) { }

    @Get('/get-all')
    getAllConfines() {
        return this.confineService.findAll();
    }

    @Get('/get-confine')
    getSoldierConfine(@Query('national_id') national_id: string) {
        return this.confineService.findOne(parseInt(national_id));
    }

    @Post('/add-confine')
    addSoldierConfine(@Body() body: CreateConfine) {
        return this.confineService.create(body);
    }


}
