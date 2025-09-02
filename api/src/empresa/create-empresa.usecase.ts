import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { Prisma, Empresa } from "@prisma/client";
import { TYPES } from "../types";
import { IEmpresaRepository } from "./repository/empresa.repository";

interface CreateEmpresaRequest extends Prisma.EmpresaCreateInput {
  logo?: string;
}

@Injectable()
export class CreateEmpresaUseCase {
  constructor(
    @Inject(TYPES.EmpresaRepository)
    private readonly iEmpresaRepository: IEmpresaRepository
  ) {}
  async execute(request: CreateEmpresaRequest): Promise<Empresa> {
    const { cnpj, ...rest } = request;

    const companyExists = await this.iEmpresaRepository.findByCnpj(cnpj);

    if (companyExists) {
      throw new ConflictException(`Company already exists with CNPJ ${cnpj}`);
    }

    return this.iEmpresaRepository.create({
      ...rest,
      cnpj,
    });
  }
}
