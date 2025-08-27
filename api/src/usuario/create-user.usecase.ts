import { Injectable, Inject } from "@nestjs/common";
import { IUserRepository } from "./repository/user.repository";
import * as argon2 from "argon2";

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
  constructor(
    @Inject("IUserRepository")
    private readonly userRepository: IUserRepository
  ) {}

  async execute(request: CreateUserRequest) {
    const { senha, dataNascimento, ...rest } = request;

    const senhaHash = await argon2.hash(senha);

    return this.userRepository.create({
      ...rest,
      senha: senhaHash,
      dataNascimento: new Date(dataNascimento).toISOString(),
    });
  }
}
