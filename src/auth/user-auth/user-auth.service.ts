import { Injectable, NotFoundException } from '@nestjs/common';
import { IAuthService } from '../interfaces/auth.service.interface';
import { UserEntity, UserRole } from 'src/users/users.entity';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { AuthHelper } from '../helpers/auth.hlper';
import { BlacklistTokenService } from 'src/blacklist-token/blacklist-token.service';

@Injectable()
export class UserAuthService implements IAuthService {

    constructor(
        private userService: UsersService,
        private authHelper: AuthHelper,
        private blacklistService: BlacklistTokenService
    ) { }
    
    async register(user: RegisterDto): Promise<UserEntity> {
        const newUser = await this.userService.create({
            name: user.name,
            email: user.email,
            password: user.password,
            role: UserRole.USER,
            avatar: user.avatar ?? undefined
        });
        
       const token = await this.authHelper.generateToken(newUser);
       return {newUser, token} as any;
    }
    async login(request: LoginDto): Promise<UserEntity> {
        let user: UserEntity | null = await this.userService.findByEmail(request.email);
    
        if (!user)
            throw new NotFoundException('Invalid credentials');

        const passwordValid = await this.authHelper.comparePasswords(request.password, user.password);

        if (!passwordValid)
            throw new NotFoundException('Invalid credentials');

        const token = await this.authHelper.generateToken(user);
        
        return {user, token} as any;

    }

    async logout(user: any): Promise<void> {
        await this.blacklistService.add(user.token, new Date(user.exp * 1000));
        return;
    }

    
}
