import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ILogin, LoginData, LoginResponse } from "./login-repository";
import { PrismaService } from "../../../prisma/prisma.service";
import { PrismaUserRepository } from "../../usuario/repository/prisma-user.repository";
import { TYPES } from "@/types";

@Injectable()
export class PrismaLoginRepository implements ILogin {
  constructor(
    @Inject(TYPES.UserRepository)
    private readonly userRepository: PrismaUserRepository,
    private readonly prisma: PrismaService,
  ) {}
  async login(data: LoginData): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    const token = "seu_token_jwt";
    const refreshToken = "refresh_token";

    return {
      token,
      refreshToken,
      user: {
        id: user.id,
        name: user.nome,
        email: user.email,
      },
    };
  }
}

// SEPARAR CAMADA DA APLICAÇÃO, E DEIXAR SOMENTE CAMADA DE REPOSITORIO
