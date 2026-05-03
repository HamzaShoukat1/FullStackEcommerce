import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { getAccessTokenSecret } from '../types';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  private readonly logger = new Logger(IsAuthenticatedGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authorizationHeader = request.headers?.authorization;

    const bearerToken =
      typeof authorizationHeader === 'string'
        ? authorizationHeader.replace(/^Bearer\s+/i, '').trim()
        : undefined;

    const cookieToken = request.cookies?.accessToken;

    const token = bearerToken || cookieToken;

    if (!token) throw new UnauthorizedException('No token provided');

    const accessSecret = getAccessTokenSecret();

    if (!accessSecret) {
      throw new UnauthorizedException('JWT access secret is not configured');
    }

    try {
      const payload = jwt.verify(token, accessSecret) as any;
      request.user = payload;
      return true;
    } catch (error: any) {
      this.logger.warn(`JWT verification failed: ${error?.message ?? 'unknown error'}`);
      throw new UnauthorizedException('Invalid token');
    }
  }
}