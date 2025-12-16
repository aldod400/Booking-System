import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { extname } from 'path';
import { ImageHelpers } from 'src/helpers/image.helpers';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    private readonly allowedExtensions = ['.png', '.pdf', '.jpeg', '.jpg'];

    constructor( @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }
    
    async create(user: CreateUserDto): Promise<UserEntity> { 
        let filePath: any = null;
        
        if (user.avatar) {
            const extension = extname(user.avatar.originalName);

            if (!this.allowedExtensions.includes(extension.toLowerCase()))
                throw new HttpException('Invalid file type. Allowed types are: ' + this.allowedExtensions.join(', '), 422);

            filePath = await ImageHelpers.saveFile('users', user.avatar.originalName, user.avatar.buffer);
        }
        user.password = await bcrypt.hash(user.password, 10);
        
        const newUser = await this.userRepository.create({
            name    : user.name ?? '',
            email   : user.email,
            password: user.password,
            role    : user.role ?? 'user',
            avatar  : filePath ?? null
        });
        
        const savedUser = await this.userRepository.save(newUser);

        return savedUser;
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return await this.userRepository.findOneBy({ email });
    }
}
