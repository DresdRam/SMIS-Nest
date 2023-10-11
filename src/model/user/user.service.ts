import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { UserDto } from "./dto/user.dto";
import { JwtService } from "@nestjs/jwt";
import { compare } from 'bcrypt';
import { jwtConstants } from "./constants/jwt.constants";
import { unauthorized } from "src/common/response/unauthorized.response";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) { }

    async logIn(user: UserDto) {

        const username: string = user.username
        const password: string = user.password

        const databaseUser = await this.userRepository.createQueryBuilder()
            .select()
            .where('username = :username', { username: username })
            .getOne()

        if (!this.comparePassword(password, databaseUser.password)) {
            throw unauthorized()
        }

        

        const payload = { role: databaseUser.username }

        return {
            access_token: await this.jwtService.signAsync(payload, { noTimestamp: true })
        }

    }

    async checkAuthorization(token: string) {
        try {
            const authorization = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
            )

            if (!authorization) {
                return false
            }

            return true

        } catch (exception: any) {
            return false
        }
    }

    private async comparePassword(password: string, hashCode: string) {

        return await compare(password, hashCode)

    }

}