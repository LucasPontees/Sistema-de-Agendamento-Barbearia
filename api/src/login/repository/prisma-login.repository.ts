import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ILogin, LoginData, LoginResponse } from "./login-repository";
import { PrismaService } from "../../../prisma/prisma.service";
import { PrismaUserRepository } from "../../usuario/repository/prisma-user.repository";
import { TYPES } from "@/types";
import { ConfigService } from "@nestjs/config";
import * as jwt from "jsonwebtoken";

@Injectable()
export class PrismaLoginRepository implements ILogin {
  constructor(
    @Inject(TYPES.UserRepository)
    private readonly userRepository: PrismaUserRepository,
    private readonly prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async login(data: LoginData): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    // Aqui você gera o token de verdade
    const secret = this.configService.get<string>("JWT_SECRET");
    if (!secret) {
      throw new UnauthorizedException(
        "Configuração inválida: JWT_SECRET ausente",
      );
    }

    const token = jwt.sign(
      {
        sub: user.id, // subject do token
        email: user.email,
        name: user.nome,
      },
      secret,
      { expiresIn: "1d" }, // expira em 1 dia
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.nome,
        email: user.email,
      },
    };
  }
}
