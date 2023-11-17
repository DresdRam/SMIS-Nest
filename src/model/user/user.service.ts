import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compare, hash } from 'bcryptjs';
import { Repository } from "typeorm";
import { RoleService } from "../role/role.service";
import { jwtConstants } from "./constants/jwt.constants";
import { UserDto } from "./dto/user.dto";
import { User } from "./entity/user.entity";

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

        if(!databaseUser){
            throw new UnauthorizedException()
        }

        const authenticated = await compare(password, databaseUser.password)

        if (!authenticated) {
            throw new UnauthorizedException()
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

    async hashPassword(password: string, salt: number = 10){
        return await hash(password, salt)
    }

}
