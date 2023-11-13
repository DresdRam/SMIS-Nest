import { Body, Controller, Post, Put, Query, UseGuards } from '@nestjs/common';
import { EnrollmentDto } from './dto/enrollment.dto';
import { EnrollmentService } from './enrollment.service';
import { Roles } from 'src/common/enum/role.enum';
import { Role } from '../role/entity/role.entity';
import { RolesGuard } from 'src/common/guard/AuthorizationGuard.guard';

@Controller('enrollment')
export class EnrollmentController {

    constructor(private readonly enrollmentService: EnrollmentService) { }
    
    @UseGuards(RolesGuard([new Role(Roles.ADMIN), new Role(Roles.SEGELAT)]))
    @Put('/update')
    UpdateSoldierEnrollment(@Query('id') id: number, @Body() body: EnrollmentDto) {
        return this.enrollmentService.update(id, body);
    }

}
