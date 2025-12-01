import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    
    @Get()
    findAll() {
        return this.usersService.getAll();
    }

    @Get(':id')
    findOne() {
        return this.usersService.getById(10);
    }
}
