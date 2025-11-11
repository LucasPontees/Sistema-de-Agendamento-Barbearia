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

    // Armazena o token em cookie httpOnly
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24, // 1 dia
    });

    // Opcional: refresh token
    if (refreshToken) {
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      });
    }

    return { user };
  }
}
