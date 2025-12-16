import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BlacklistTokenService } from 'src/blacklist-token/blacklist-token.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtBlacklistGuard implements CanActivate {
  constructor(private readonly blacklistTokenService: BlacklistTokenService,
    private jwtService: JwtService
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token)
      return false;

    const isBlacklisted = this.blacklistTokenService.has(token);
    
    if (isBlacklisted)
      return false;
    
    
    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Token invalid or expired');
    }
  }
}
