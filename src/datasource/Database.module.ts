import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: process.env.DB_TYPE as any || 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 5432,
            username: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD || '123456',
            database: process.env.DB_DATABASE || 'nest_db',
            synchronize: process.env.DB_SYNCHRONIZE === 'true',
            autoLoadEntities: true,
        }),
    ],
    providers: [],
    exports: [TypeOrmModule],
})
export class DatabaseModule { }