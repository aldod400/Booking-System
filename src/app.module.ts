import { Module } from '@nestjs/common';
import { DatabaseModule } from './datasource/Database.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { IsUniqueConstraint } from './common/validators/is-unique.constraint';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProvidersModule } from './providers/providers.module';
import { SlotsModule } from './slots/slots.module';
import { BookingsModule } from './bookings/bookings.module';
import { UserAuthService } from './auth/user-auth/user-auth.service';
import { BlacklistTokenModule } from './blacklist-token/blacklist-token.module';
import { BlacklistTokenService } from './blacklist-token/blacklist-token.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    ProvidersModule,
    SlotsModule,
    BookingsModule,
    BlacklistTokenModule,
  ],
  controllers: [],
  providers: [IsUniqueConstraint, UserAuthService, BlacklistTokenService],
})
export class AppModule {}