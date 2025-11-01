import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { TYPES } from "../types";
import { IEmpresaRepository } from "./repository/empresa.repository";
import { CreateEmpresaDto } from "./dto/create-empresa.dto";
import { Empresa } from "./entities/empresa.entity";
import { IUserRepository } from "@/usuario/repository/user.repository";
import { CreateUserUseCase } from "@/usuario/create-user.usecase";

@Injectable()
export class CreateEmpresaUseCase {
  constructor(
    @Inject(TYPES.EmpresaRepository)
    private readonly iEmpresaRepository: IEmpresaRepository,
    @Inject(TYPES.UserRepository)
    private readonly iUserRepository: IUserRepository,
    private readonly createUserUseCase: CreateUserUseCase
  ) {}
  async execute(request: CreateEmpresaDto): Promise<Empresa> {
    const { cnpj, usuario, ...rest } = request;

    const companyExists = await this.iEmpresaRepository.findByCnpj(cnpj);

    if (companyExists) {
      throw new ConflictException(`Company already exists with CNPJ`);
    }

    const userExists = await this.iUserRepository.findByEmail(usuario.email);

    if (userExists) {
      throw new ConflictException(`User already exists with email `);
    }

    // Cria a empresa sem o campo usuario
    const empresa = await this.iEmpresaRepository.create({
      ...rest,
      cnpj,
    } as Omit<CreateEmpresaDto, "usuario">); // assert para type safety

    // Cria o usuário admin vinculado à empresa
    await this.createUserUseCase.execute(
      {
        ...usuario,
      },
      empresa.id
    );

    return empresa;
  }
}
