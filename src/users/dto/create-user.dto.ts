import { IsEmpty, IsNotEmpty } from "class-validator";
import { IsUnique } from "src/common/validators/is-unique.decorator";
import { UserEntity, UserRole } from "../users.entity";
import { IsFile, MaxFileSize, MemoryStoredFile } from "nestjs-form-data";

export class CreateUserDto { 

        @IsNotEmpty()
        name: string;
    
        @IsNotEmpty()
        @IsUnique({ entity: UserEntity, column: 'email' }, { message: 'Email already in use' })
        email: string;
    
        @IsNotEmpty()
        password: string;

        @IsEmpty()
        role: UserRole;
    
        @IsFile()
        @MaxFileSize(2 * 1024 * 1024, { message: 'Avatar file size must not exceed 2MB' })
        avatar?: MemoryStoredFile;
}