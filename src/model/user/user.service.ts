import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { UserDto } from "./dto/user.dto";
import { JwtService } from "@nestjs/jwt";
import { compare } from 'bcryptjs';
import { jwtConstants } from "./constants/jwt.constants";
import { unauthorized } from "src/common/response/unauthorized.response";
import { Role } from "../role/entity/role.entity";
import { RoleService } from "../role/role.service";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly roleService: RoleService,
        private readonly jwtService: JwtService
    ) { }

    async logIn(user: UserDto) {

        const username: string = user.username
        const password: string = user.password

        const databaseUser = await this.userRepository.createQueryBuilder('u')
            .select()
            .innerJoinAndSelect('u.userRole', 'ur', 'u.id = ur.user_id')
            .innerJoinAndSelect('ur.role', 'r', 'ur.role_code = r.code')
            .where('u.username = :username', { username: username })
            .getOne()

        if (!this.comparePassword(password, databaseUser.password)) {
            throw unauthorized()
        }

        const payload = { role: databaseUser.userRole.role.role }

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