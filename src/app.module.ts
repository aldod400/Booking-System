import { Module } from '@nestjs/common';
import { DatabaseModule } from './datasource/Database.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { IsUniqueConstraint } from './common/validators/is-unique.constraint';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProvidersModule } from './providers/providers.module';
import { SlotsModule } from './slots/slots.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    ProvidersModule,
    SlotsModule,
    BookingsModule,
  ],
  controllers: [],
  providers: [IsUniqueConstraint],
})
export class AppModule {}