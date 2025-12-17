import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { BlacklistTokenService } from "src/blacklist-token/blacklist-token.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
     constructor(
    private blacklistService: BlacklistTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'yourSecretKey',
    });
  }

  async validate(payload: any) {
    const isBlacklisted = await this.blacklistService.has(payload.token);
    if (isBlacklisted)
      throw new UnauthorizedException();

    return payload;
  }
 }