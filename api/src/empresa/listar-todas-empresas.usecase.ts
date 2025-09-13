import { Inject, Injectable } from "@nestjs/common";
import { TYPES } from "../types";
import { IEmpresaRepository } from "./repository/empresa.repository";

@Injectable()
export class ListarTodasEmpresasUseCase {
  constructor(
    @Inject(TYPES.EmpresaRepository)
    private readonly iEmpresaRepository: IEmpresaRepository
  ) {}

  async execute() {
    const empresas = this.iEmpresaRepository.findAll();
    return empresas;
  }
}
