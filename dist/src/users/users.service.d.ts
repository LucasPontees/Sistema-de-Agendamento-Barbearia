import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateUserDto): Promise<{
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
