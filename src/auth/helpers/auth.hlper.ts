import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/users/users.entity';

@Injectable()
export class AuthHelper {
    constructor(private jwtService: JwtService) { }
    
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async comparePasswords(password: string, hashed: string): Promise<boolean> {
       return bcrypt.compare(password, hashed);
    }

    async generateToken(user: UserEntity): Promise<string> {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        };
        
        return this.jwtService.sign(payload);
    }
}