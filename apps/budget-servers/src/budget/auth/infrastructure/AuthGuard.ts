import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly supabaseClient: SupabaseClient) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromRequest(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        const jwt = this.extractTokenFromRequest(request);

        if (!jwt) return false;

        const user = await this.supabaseClient.auth.getUser(jwt);

        return true;
    }

    private extractTokenFromRequest(request: Request) {
        const [type, token] = request.headers.get('Authorization')?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
