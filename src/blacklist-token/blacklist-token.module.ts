import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistTokenEntity } from './blacklist-tokens.entity';
import { BlacklistTokenService } from './blacklist-token.service';

@Module({
    imports: [TypeOrmModule.forFeature([BlacklistTokenEntity])],
    controllers: [],
    providers: [BlacklistTokenService],
    exports: [],
})
export class BlacklistTokenModule {}
