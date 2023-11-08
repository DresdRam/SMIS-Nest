import { Controller, Get, Query } from '@nestjs/common';
import { OfficerService } from './officer.service';

@Controller('officer')
export class OfficerController {

  constructor(private readonly officerService: OfficerService) { }

  @Get('get-officer')
  getOfficer(@Query('id') id: number) {
    if (id) {
      return this.officerService.getOfficerData(id);
    }

    return {
      statusCode: 400,
      message: "Bad Params."
    }
  }

  @Get('search')
  searchOfficer(@Query('name') name: string, @Query('page') page: number = 1, @Query('size') size: number = 10) {
    if (name) {
      return this.officerService.searchByName(name, page, size);
    }

    return {
      statusCode: 400,
      message: "Bad Params."
    }
  }
  
}
