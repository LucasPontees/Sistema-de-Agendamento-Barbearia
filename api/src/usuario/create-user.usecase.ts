import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "./repository/user.repository";
import { IHasher } from "./hash/hasher";
import { TYPES } from "../types";
import { User } from "./entities/user.entity";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(TYPES.UserRepository)
    private readonly iUserRepository: IUserRepository,
    @Inject(TYPES.Hasher)
    private readonly hasher: IHasher,
  ) {}

  async execute(request: CreateUsuarioDto): Promise<User> {
    const { senha, email, ...rest } = request;

    const userExists = await this.iUserRepository.findByEmail(email);

    if (userExists) {
      throw new ConflictException(`User already exists with email ${email}`);
    }

    const senhaHash = await this.hasher.hash(senha);

    const user = this.iUserRepository.create({
      ...rest,
      senha: senhaHash,
      email: email,
    });

    return user;
  }
}
