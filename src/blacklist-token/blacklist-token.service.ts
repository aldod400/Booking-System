import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlacklistTokenEntity } from './blacklist-tokens.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlacklistTokenService {
    constructor(
        @InjectRepository(BlacklistTokenEntity) private readonly blacklistTokenRepository: Repository<BlacklistTokenEntity>
    ) { }

    async add(token: string, expiresAt: Date): Promise<void> {
        await this.blacklistTokenRepository.save({ token: token, expiresAt });
    }

    async has(token: string): Promise<boolean> {
        return await this.blacklistTokenRepository.exist({ where: { token } });
    }
}
