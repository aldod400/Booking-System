import { Controller, Post } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/users.entity';

@Controller('auth/users')
export class UserAuthController {
    constructor(private readonly userAuthService: UserAuthService) { }
    
    @Post('register')
    async register(user: CreateUserDto): Promise<any> {

        return {
            statusCode: 201,
            message   : 'User registered successfully',
            data: await this.userAuthService.register(user),
        }
    }
}
