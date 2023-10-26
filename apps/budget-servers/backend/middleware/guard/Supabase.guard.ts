import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { User } from '@supabase/supabase-js';
import { Request } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import { AuthenticatedRequest } from '../../routes/AuthenticatedRequest';
import { IS_PUBLIC_KEY } from '../../utils/authentication';
import { isExpiredTokenError } from '../../utils/isExpiredTokenError';

@Injectable()
export class SupabaseGuard implements CanActivate {
  constructor(
    // private supabaseService: SupabaseService,
    private configService: ConfigService,
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    const token = this.extractJwtFromBearerHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const secretJwt = this.configService.get<string>('SUPABASE_JWT') || '';

    try {
      (request as AuthenticatedRequest).user = await this.jwtService.verifyAsync<User>(token, {
        secret: secretJwt,
      });
    } catch (error: unknown) {
      const jsonWebTokenError = error as JsonWebTokenError;

      if (isExpiredTokenError(jsonWebTokenError as TokenExpiredError)) {
        throw new UnauthorizedException(jsonWebTokenError.message);
      }
    }

    return true;
  }

  private extractJwtFromBearerHeader(request: Request) {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
