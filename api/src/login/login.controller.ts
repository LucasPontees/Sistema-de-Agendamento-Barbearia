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
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, user } = await this.authService.login(loginDto);

    if (!token) {
      throw new BadRequestException("Credenciais inválidas");
    }

    return { token, user };
  }
}
