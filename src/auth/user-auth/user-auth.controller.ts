import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserEntity } from 'src/users/users.entity';

@Controller('auth/users')
export class UserAuthController {
    constructor(private readonly userAuthService: UserAuthService) { }
    
    @Post('register')
    async register(@Body() user: RegisterDto): Promise<any> {
        const result: any = await this.userAuthService.register(user);
        return {
            statusCode: 201,
            message   : 'User registered successfully',
            data: {user: result.newUser, token: result.token},
        }
    }

    @Post('login')
    async login(@Body() user: LoginDto): Promise<any> {
        return {
            statusCode: 200,
            message   : 'User logged in successfully',
            data      : await this.userAuthService.login(user),
        };
    }
    
    @Post('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Req() request): Promise<any> {
        await this.userAuthService.logout(request.user);
        return {
            statusCode: 200,
            message   : 'User logged out successfully',
        };
    }
}
