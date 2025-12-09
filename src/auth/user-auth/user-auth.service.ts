import { Injectable } from '@nestjs/common';
import { IAuthService } from '../interfaces/auth.service.interface';
import { UserEntity, UserRole } from 'src/users/users.entity';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserAuthService implements IAuthService {

    constructor(private userService: UsersService) { }
    
    async register(user: RegisterDto): Promise<UserEntity> {
        const newUser = await this.userService.create({
            name: user.name,
            email: user.email,
            password: user.password,
            role: UserRole.USER,
            avatar: user.avatar ?? undefined
        });
        
       return newUser;
    }
    login(user: LoginDto): Promise<UserEntity> {
        throw new Error('Method not implemented.');
    }
    logout(userId: number): Promise<void> {
        throw new Error('Method not implemented.');
    }

    
}
