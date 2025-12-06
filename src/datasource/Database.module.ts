

import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                synchronize: false,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
                migrationsTableName: 'migrations',
            }),
    ],
    providers: [],
    exports: [TypeOrmModule],
})
export class DatabaseModule { }