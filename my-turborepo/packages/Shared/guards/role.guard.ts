import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ROLES_KEY } from '../Decorators/role.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Read @Roles metadata directly from handler first, then controller class.
    const requiredRoles =
      Reflect.getMetadata(ROLES_KEY, context.getHandler()) ||
      Reflect.getMetadata(ROLES_KEY, context.getClass());

    // If no roles defined → allow access
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Safety check
    if (!user) {
      throw new ForbiddenException('No user found in request');
    }

    // Check if user has role property
    if (!user.role) {
      throw new ForbiddenException('User role not found in token');
    }

    // Check role
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException(`Access denied. Required roles: ${requiredRoles.join(', ')}, but user has role: ${user.role}`);
    }

    return true;
  }
}