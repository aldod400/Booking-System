import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthHelper } from './helpers/auth.hlper';
import { UserAuthService } from './user-auth/user-auth.service';
import { AdminAuthService } from './admin-auth/admin-auth.service';
import { AdminAuthController } from './admin-auth/admin-auth.controller';
import { UserAuthController } from './user-auth/user-auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '7d' },
    }),
    UsersModule
  ],
  providers: [UserAuthService, AdminAuthService, AuthHelper],
  controllers: [AdminAuthController, UserAuthController],
  exports: [AuthHelper],
})
export class AuthModule {}
