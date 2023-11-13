import { CanActivate, ExecutionContext, UnauthorizedException, mixin } from "@nestjs/common";
import { Role } from "src/model/role/entity/role.entity";
import { ifArrayContains } from "../helper/ifArrayContains.helper";
import { Roles } from "../enum/role.enum";

export const RolesGuard = (roles: Role[]) => {

  class AuthorizationGuard implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {

      const request = context.switchToHttp().getRequest();
      const role: Role = request.role

      if (!role) {
        console.log(`Authorization Guard Role -> Error (!role)`)
        throw new UnauthorizedException();
      }

      if(ifArrayContains<Role>(roles, new Role(Roles.ANYUSER))) return true

      return ifArrayContains<Role>(roles, role)
    }
  }
  
  return mixin(AuthorizationGuard);
}