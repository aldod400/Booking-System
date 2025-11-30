import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'nest_db',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}