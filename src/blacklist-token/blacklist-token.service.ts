import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlacklistTokenEntity } from './blacklist-tokens.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlacklistTokenService {
    constructor(@InjectRepository(BlacklistTokenEntity) private readonly blacklistTokenRepository: Repository<BlacklistTokenEntity>) { }

    async add(token: string, expiresAt?: Date): Promise<BlacklistTokenEntity> {
        const blacklistedToken = this.blacklistTokenRepository.create({ token, expiresAt });
        return await this.blacklistTokenRepository.save(blacklistedToken);
    }

    has(token: string): boolean {
        const tokenExist = this.blacklistTokenRepository.findOneBy({ token });
        return !!tokenExist;
    }
}
