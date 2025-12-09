import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { IsFile, MaxFileSize, MemoryStoredFile } from "nestjs-form-data";
import { IsUnique } from "src/common/validators/is-unique.decorator";
import { UserEntity } from "src/users/users.entity";

export class RegisterDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsUnique({ entity: UserEntity, column: 'email' }, { message: 'Email already in use' })
    email: string;

    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @MaxLength(20, { message: 'Password must be at most 20 characters long' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, { 
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character' 
    })
    password: string;
    
    
    @IsFile()
    @MaxFileSize(2 * 1024 * 1024, { message: 'Avatar file size must not exceed 2MB' })
    avatar?: MemoryStoredFile;
}