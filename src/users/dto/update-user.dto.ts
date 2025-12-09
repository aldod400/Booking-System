import { IsEmpty, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";
import { IsUnique } from "src/common/validators/is-unique.decorator";
import { UserEntity, UserRole } from "../users.entity";
import { MaxFileSize } from "nestjs-form-data/dist/decorators/validation/max-file-size.validator";
import { IsFile } from "nestjs-form-data/dist/decorators/validation/is-file.validator";

export class UpdateUserDto { 

        @IsNotEmpty()
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

        @IsEmpty()
        role: UserRole;
    
        @IsFile()
        @MaxFileSize(2 * 1024 * 1024, { message: 'Avatar file size must not exceed 2MB' })
        avatar?: File;
}