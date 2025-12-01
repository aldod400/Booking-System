import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }
    
    async getAll() {
        return await this.userRepository.find();
    }
    
    async getById(id: number) {
        return await this.userRepository.findOneBy({ id });
    }
}