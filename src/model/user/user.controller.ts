import { Controller, Get, Post, Body, Query, Put, UnauthorizedException, Ip, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { noAuthToken } from 'src/common/response/unauthorized.response';
import { Roles } from 'src/common/enum/role.enum';
import { Role } from '../role/entity/role.entity';
import { RolesGuard } from 'src/common/guard/AuthorizationGuard.guard';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Get('login')
    logIn(@Body() body: UserDto) {
        return this.userService.logIn(body)
    }

    @UseGuards(RolesGuard([new Role(Roles.ADMIN)]))
    @Get('verify-token')
    verifyToken(@Query('token') token: string) {
        if (!token) {
            return noAuthToken()
        }

        return this.userService.checkAuthorization(token)
    }

}