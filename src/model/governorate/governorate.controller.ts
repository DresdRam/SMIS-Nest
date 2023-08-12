import { Controller, Get } from '@nestjs/common';
import { GovernorateService } from './governorate.service';

@Controller('governorate')
export class GovernorateController {

    constructor(private governorateService: GovernorateService){ }

    @Get('/get-all')
    getAllGovernorates(){
        return this.governorateService.findAll();
    }

}
