import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/decorators/guards/roles.decorator';
import { UserRole } from 'src/users/users.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
    ROLES_KEY,
    [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    return requiredRoles.includes(user.role);
  }
}
