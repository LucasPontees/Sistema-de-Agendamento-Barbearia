import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "./repository/user.repository";
import { Prisma, Usuario } from "@prisma/client";
import { IHasher } from "./hash/hasher";
import { TYPES } from "../types";

interface CreateUserRequest extends Prisma.UsuarioCreateInput {
  fotoPerfil?: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(TYPES.UserRepository)
    private readonly iUserRepository: IUserRepository,
    @Inject(TYPES.Hasher)
    private readonly hasher: IHasher,
  ) {}

  async execute(request: CreateUserRequest): Promise<Usuario> {
    const { senha, email, ...rest } = request;

    const userExists = await this.iUserRepository.findByEmail(email);

    if (userExists) {
      throw new ConflictException(`User already exists with email ${email}`);
    }

    const senhaHash = await this.hasher.hash(senha);

    return this.iUserRepository.create({
      ...rest,
      senha: senhaHash,
      email: email.toLowerCase(),
    });
  }
}
