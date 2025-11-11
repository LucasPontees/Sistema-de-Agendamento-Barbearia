// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { CookieOptions, Response } from "express";
import { PrismaLoginRepository } from "./repository/prisma-login.repository";
import { LoginDto } from "./dto/create-login.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: PrismaLoginRepository,
    private readonly configService: ConfigService
  ) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<{ user: { id: number; name: string; email: string } }> {
    const { token, refreshToken, user } =
      await this.authService.login(loginDto);

    if (!token) {
      throw new BadRequestException("Credenciais inválidas");
    }

    const isProduction =
      this.configService.get<string>("APP_ENV") === "production";
    const cookieDomain =
      this.configService.get<string>("COOKIE_DOMAIN") || undefined;

    const accessTokenCookieOptions: CookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24, // 1 dia
    };

    if (cookieDomain) {
      accessTokenCookieOptions.domain = cookieDomain;
    }

    // Armazena o token em cookie httpOnly
    res.cookie("access_token", token, accessTokenCookieOptions);

    // Opcional: refresh token
    if (refreshToken) {
      const refreshTokenCookieOptions: CookieOptions = {
        ...accessTokenCookieOptions,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      };

      res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
    }

    return { user };
  }
}
