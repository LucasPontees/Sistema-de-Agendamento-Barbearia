import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: SignUpDto): Promise<{
        name: string;
        email: string;
        id: number;
    }>;
    signin(dto: SignInDto): Promise<{
        access_token: string;
    }>;
}
