import { Module } from '@nestjs/common';
import { DatabaseModule } from './datasource/Database.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { IsUniqueConstraint } from './common/validators/is-unique.constraint';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [IsUniqueConstraint],
})
export class AppModule {}