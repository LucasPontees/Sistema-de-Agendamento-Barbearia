import { ConflictException, Injectable } from "@nestjs/common";
import { IUserRepository } from "./repository/user.repository";
import { Prisma, Usuario } from "@prisma/client";
import { Hasher } from "./hash/hasher";

interface CreateUserRequest extends Prisma.UsuarioCreateInput {}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly iUserRepository: IUserRepository,
    private readonly hasher: Hasher
  ) {}

  async execute(request: CreateUserRequest): Promise<Usuario> {
    const { senha, email, ...rest } = request;

    const userExists = await this.iUserRepository.findByEmail(email);

    if (userExists) {
      throw new ConflictException("User already exists");
    }

    const senhaHash = await this.hasher.hash(senha);

    return this.iUserRepository.create({
      ...rest,
      senha: senhaHash,
      email: email.toLowerCase(),
    });
  }
}
