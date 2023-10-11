import { Controller, Get, Post, Body, Query, Put, UnauthorizedException, Ip, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { noAuthToken } from 'src/common/response/unauthorized.response';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Get('login')
    logIn(@Body() body: UserDto) {
        return this.userService.logIn(body)
    }

    @Get('verify-token')
    verifyToken(@Query('token') token: string) {
        if (!token) {
            return noAuthToken()
        }

        return this.userService.checkAuthorization(token)
    }

}