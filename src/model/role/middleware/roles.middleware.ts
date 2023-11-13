import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { jwtConstants } from "../../user/constants/jwt.constants";
import { Role } from "../entity/role.entity";

@Injectable()
export class RolesMiddleware implements NestMiddleware {

    constructor(private readonly jwtService: JwtService) { }

    async use(request: Request, response: Response, next: NextFunction) {

        const token = this.extractTokenFromHeader(request);

        if (token) {

            try {
                const payload = await this.jwtService.verifyAsync(
                    token,
                    {
                        secret: jwtConstants.secret
                    }
                );

                const role = new Role(payload.role)

                //@ts-ignore
                request.role = role;

            } catch (exception: any) { console.error(`Unauthorized Request on ${request.baseUrl} \nException In Roles Middlware: ${exception.message}`) }
        }

        next()
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const token = request.headers.authorization?.split(', ')[0] ?? ''
        return token ? token : undefined;
    }

}