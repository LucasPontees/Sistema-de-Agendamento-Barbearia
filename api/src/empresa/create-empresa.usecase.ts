import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { TYPES } from "../types";
import { IEmpresaRepository } from "./repository/empresa.repository";
import { CreateEmpresaDto } from "./dto/create-empresa.dto";
import { Empresa } from "./entities/empresa.entity";
import { IUserRepository } from "@/usuario/repository/user.repository";
import { IHasher } from "@/usuario/hash/hasher";

@Injectable()
export class CreateEmpresaUseCase {
  constructor(
    @Inject(TYPES.EmpresaRepository)
    private readonly iEmpresaRepository: IEmpresaRepository,
    @Inject(TYPES.UserRepository)
    private readonly iUserRepository: IUserRepository
  ) {}
  async execute(request: CreateEmpresaDto): Promise<Empresa> {
    const { cnpj, ...rest } = request;

    const companyExists = await this.iEmpresaRepository.findByCnpj(cnpj);

    if (companyExists) {
      throw new ConflictException(`Company already exists with CNPJ`);
    }

    const userExists = await this.iUserRepository.findByEmail(
      rest.usuario.email
    );

    if (userExists) {
      throw new ConflictException(`User already exists with email `);
    }

    const empresa = await this.iEmpresaRepository.create({
      ...rest,
      cnpj,
    });

    return empresa;
  }
}
