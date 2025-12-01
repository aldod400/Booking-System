import { Module } from '@nestjs/common';
import { DatabaseModule } from './datasource/Database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}