import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "./repository/user.repository";
import { IHasher } from "./hash/hasher";
import { TYPES } from "../types";
import { User } from "./entities/user.entity";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { IEmpresaRepository } from "@/empresa/repository/empresa.repository";

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(TYPES.UserRepository)
    private readonly iUserRepository: IUserRepository,
    @Inject(TYPES.Hasher)
    private readonly hasher: IHasher,
    @Inject(TYPES.EmpresaRepository)
    private readonly iEmpresaRepository: IEmpresaRepository
  ) {}

  async execute(request: CreateUsuarioDto, empresaId: number) {
    const { senha, email, ...rest } = request;

    const companyExists = await this.iEmpresaRepository.findById(empresaId);

    if (!companyExists) {
      throw new ConflictException(`Company with ID ${empresaId} not found`);
    }

    const userExists = await this.iUserRepository.findByEmail(email);

    if (userExists) {
      throw new ConflictException(`User already exists with email ${email}`);
    }

    const senhaHash = await this.hasher.hash(senha);

    const user = this.iUserRepository.create(
      {
        ...rest,
        senha: senhaHash,
        email: email,
      },
      empresaId
    );

    return user;
  }
}
