import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "@/auth/auth.service";
import { LoginUserDto } from "@/users/dtos/users.user.dto";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Post("login")
  public async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<any> {
    const { Authorization, expiresIn, data } =
      await this.authService.login(loginUserDto);

    res.cookie("auth-token", Authorization, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      //1 minute
      maxAge: 1000 * 60 * 60 * 1, // 1 hora
    });

    return {
      message: "Login realizado com sucesso",
      data,
      token: Authorization,
    };
  }

  @Get("check")
  checkAuth(@Req() request: Request) {
    const token = request.cookies["auth-token"];

    if (!token) {
      return { isAuthenticated: false };
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    try {
      const payload = this.jwtService.verify(token);
      return { isAuthenticated: true, user: payload };
    } catch (err) {
      return { isAuthenticated: false };
    }
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response) {
    res.cookie("auth-token", "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 0, // Remove cookie
    });

    return { message: "Logout realizado com sucesso" };
  }
}
