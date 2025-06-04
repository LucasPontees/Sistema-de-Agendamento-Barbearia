import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    signup(data: SignUpDto): Promise<{
        name: string;
        email: string;
        id: number;
    }>;
    signin(data: SignInDto): Promise<{
        access_token: string;
    }>;
}
