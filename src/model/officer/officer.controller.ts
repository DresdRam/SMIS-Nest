import { Body, Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common';
import { OfficerService } from './officer.service';
import { RolesGuard } from 'src/common/guard/AuthorizationGuard.guard';
import { Role } from '../role/entity/role.entity';
import { Roles } from 'src/common/enum/role.enum';
import { OfficerDto } from './dto/officer.dto';

@Controller('officer')
export class OfficerController {

  constructor(private readonly officerService: OfficerService) { }

  @UseGuards(RolesGuard([new Role(Roles.ANYUSER)]))
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

  @UseGuards(RolesGuard([new Role(Roles.ANYUSER)]))
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

  @UseGuards(RolesGuard([new Role(Roles.ADMIN)]))
  @Post('add-officer')
  createOfficer(@Body() body: OfficerDto){
    return this.officerService.create(body)
  }

  @UseGuards(RolesGuard([new Role(Roles.ADMIN)]))
  @Delete('delete-officer')
  deleteOfficer(@Query('id') id: number){
    return this.officerService.delete(id)
  }
  
}
