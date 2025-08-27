import { Injectable, Inject } from "@nestjs/common";
import { IUserRepository, UserResponse } from "./repository/user.repository";
import * as argon2 from "argon2";
import { PrismaUserRepository } from "./repository/prisma-user.repository";

interface CreateUserRequest {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  dataNascimento: string;
  fotoPerfil: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly prismaUserRepository: PrismaUserRepository) {}

  async execute(request: CreateUserRequest): Promise<UserResponse> {
    const { senha, dataNascimento, ...rest } = request;

    const senhaHash = await argon2.hash(senha);

    return this.prismaUserRepository.create({
      ...rest,
      senha: senhaHash,
      dataNascimento: new Date(dataNascimento).toISOString(),
    });
  }
}
