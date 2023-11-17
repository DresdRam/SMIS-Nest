import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/enum/role.enum';
import { RolesGuard } from 'src/common/guard/AuthorizationGuard.guard';
import { Role } from '../role/entity/role.entity';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Post('login')
    logIn(@Body() body: UserDto) {
        return this.userService.logIn(body)
    }

    @UseGuards(RolesGuard([new Role(Roles.ADMIN)]))
    @Get('verify-token')
    verifyToken(@Query('token') token: string) {
        if (!token) {
            return {
                message: "Bad Params.",
                statusCode: 400   
            }
        }

        return this.userService.checkAuthorization(token)
    }

    @UseGuards(RolesGuard([new Role(Roles.ADMIN)]))
    @Get('hash-pass')
    hashPassword(@Query('password') password: string) {
        if (!password) {
            return {
                message: "Bad Params.",
                statusCode: 400   
            }
        }

        return this.userService.hashPassword(password)
    }

}