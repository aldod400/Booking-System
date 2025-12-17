import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthHelper } from './helpers/auth.hlper';
import { UserAuthService } from './user-auth/user-auth.service';
import { AdminAuthService } from './admin-auth/admin-auth.service';
import { AdminAuthController } from './admin-auth/admin-auth.controller';
import { UserAuthController } from './user-auth/user-auth.controller';
import { UsersModule } from '../users/users.module';
import { BlacklistTokenModule } from '../blacklist-token/blacklist-token.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKey',
      signOptions: { expiresIn: '7d' },
    }),
    UsersModule,
    BlacklistTokenModule
  ],
  providers: [UserAuthService, AdminAuthService, AuthHelper, JwtStrategy],
  controllers: [AdminAuthController, UserAuthController],
  exports: [AuthHelper],
})
export class AuthModule {}
