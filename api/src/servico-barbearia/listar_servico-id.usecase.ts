import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { TYPES } from "../types";
import { IServicoBarbeariaRepository } from "./repository/servico-barbearia.repository";

@Injectable()
export class ListarServicoIdUseCase {
  constructor(
    @Inject(TYPES.ServicoBarbeariaRepository)
    private readonly iServicoBarbeariaRepository: IServicoBarbeariaRepository,
  ) {}
  async execute(id: number, empresaId: number) {
    const servico = await this.iServicoBarbeariaRepository.findById(
      id,
      empresaId,
    );

    if (!servico) {
      throw new ConflictException(`Servico with ID ${id} not found`);
    }

    return servico;
  }
}
