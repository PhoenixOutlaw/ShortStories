import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    const req = GqlExecutionContext.create(context).getContext().req;
    if (!roles) {
      return true;
    }
    return roles.flat().includes(req.jwt.role);
  }
}

const Roles = (...roles: string[][]) => SetMetadata("roles", roles);
export default Roles;
