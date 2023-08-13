import { Controller, Get, Query } from '@nestjs/common';
import { UnitService } from './unit.service';

@Controller('unit')
export class UnitController {

    constructor(private readonly unitService: UnitService) { }

    @Get('/get-all')
    getAllUnits(){
        return this.unitService.findAll();
    }

}
