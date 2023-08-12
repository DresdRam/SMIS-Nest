import { Body, Controller, Post, Put, Query } from '@nestjs/common';
import { EnrollmentDto } from './dto/enrollment.dto';
import { EnrollmentService } from './enrollment.service';

@Controller('enrollment')
export class EnrollmentController {

    constructor(private readonly enrollmentService: EnrollmentService) { }
    
    @Put('/update')
    UpdateSoldierEnrollment(@Query('id') id: number, @Body() body: EnrollmentDto) {
        return this.enrollmentService.update(id, body);
    }

}
