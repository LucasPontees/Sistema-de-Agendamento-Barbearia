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
import { Response } from "express";
import { PrismaLoginRepository } from "./repository/prisma-login.repository";
import { LoginDto } from "./dto/create-login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: PrismaLoginRepository) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { token, refreshToken, user } =
      await this.authService.login(loginDto);

    if (!token) {
      throw new BadRequestException("Credenciais inválidas");
    }

    const cookieDomain = this.resolveCookieDomain();
    const isProduction = process.env.APP_ENV === "production";

    // Armazena o token em cookie httpOnly
    res.cookie("access_token", token, {
      httpOnly: true,
      path: "/",
      domain: cookieDomain,
      secure: isProduction,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24, // 1 dia
    });

    // Opcional: refresh token
    if (refreshToken) {
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/",
        domain: cookieDomain,
        secure: isProduction,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      });
    }

    return { user };
  }

  private resolveCookieDomain(): string | undefined {
    if (process.env.APP_ENV !== "production") {
      return undefined;
    }

    const rawDomain = process.env.DOMAIN_URL?.trim();
    if (!rawDomain) {
      return undefined;
    }

    const sanitized = rawDomain
      .replace(/^(https?:\/\/)/i, "")
      .split("/")[0]
      .trim();

    if (!sanitized || sanitized === "localhost") {
      return undefined;
    }

    return sanitized;
  }
}
