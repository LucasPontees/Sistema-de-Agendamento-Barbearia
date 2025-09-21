import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { TYPES } from "../types";
import { IEmpresaRepository } from "./repository/empresa.repository";
import { CreateEmpresaDto } from "./dto/create-empresa.dto";
import { Empresa } from "./entities/empresa.entity";

@Injectable()
export class CreateEmpresaUseCase {
  constructor(
    @Inject(TYPES.EmpresaRepository)
    private readonly iEmpresaRepository: IEmpresaRepository,
  ) {}
  async execute(request: CreateEmpresaDto): Promise<Empresa> {
    const { cnpj, ...rest } = request;

    const companyExists = await this.iEmpresaRepository.findByCnpj(cnpj);

    if (companyExists) {
      throw new ConflictException(`Company already exists with CNPJ ${cnpj}`);
    }

    const empresa = await this.iEmpresaRepository.create({
      ...rest,
      cnpj,
    });

    return empresa;
  }
}
