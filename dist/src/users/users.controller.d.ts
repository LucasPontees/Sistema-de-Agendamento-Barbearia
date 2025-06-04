import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        name: string;
        email: string;
        password: string;
        id: number;
    }>;
    findAll(): Promise<{
        name: string;
        email: string;
        password: string;
        id: number;
    }[]>;
}
