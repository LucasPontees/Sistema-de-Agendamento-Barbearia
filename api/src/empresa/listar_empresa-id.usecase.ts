import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { TYPES } from "../types";
import { IEmpresaRepository } from "./repository/empresa.repository";

@Injectable()
export class ListarEmpresaIdUseCase {
  constructor(
    @Inject(TYPES.EmpresaRepository)
    private readonly iEmpresaRepository: IEmpresaRepository
  ) {}
  async execute(id: number) {
    const empresa = await this.iEmpresaRepository.findById(id);

    if (!empresa) {
      throw new ConflictException(`Empresa with ID ${id} not found`);
    }

    return empresa;
  }
}
