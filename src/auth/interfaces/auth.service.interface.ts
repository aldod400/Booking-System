import { UserEntity } from "src/users/users.entity";
import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";

export interface IAuthService {

    register(user: RegisterDto): Promise<UserEntity>;

    login(user: LoginDto): Promise<UserEntity>;
    
    logout(user: UserEntity): Promise<void>;
}