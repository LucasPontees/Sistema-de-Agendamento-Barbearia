import { TYPES } from "@/types";
import { Inject, Injectable } from "@nestjs/common";
import { IAgendamentoRepository } from "./repository/agendamento.repository";
import { Agendamento } from "@prisma/client";

@Injectable()
export class RetornaAgendamentosClienteUsecase {
  constructor(
    @Inject(TYPES.AgendamentoRepository)
    private readonly iAgendamentoRepository: IAgendamentoRepository
  ) {}

  async retornaAgendamentosCliente(usuarioId: number): Promise<Agendamento[]> {
    return this.iAgendamentoRepository.returnAgendamentoPorCliente(usuarioId);
  }
}
