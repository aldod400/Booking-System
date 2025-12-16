import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtHelpers {
    constructor(private readonly jwtService: JwtService) { }
    
    extractTokenFromHeader(authHeader: string): string {
        if (!authHeader)
            throw new UnauthorizedException('Token not provided');

        const parts = authHeader.split(' ');

        if (parts.length !== 2 || parts[0] !== 'Bearer')
            throw new UnauthorizedException('Invalid Token');

        return parts[1];
    }

    decodeToken(token: string) {
    const decoded: any = this.jwtService.decode(token);
    if (!decoded) throw new UnauthorizedException('Invalid token');
    return decoded;
  }

  getTokenExpiry(token: string): Date | null {
    const decoded = this.decodeToken(token);
    return decoded?.exp ? new Date(decoded.exp * 1000): null;
  }
}