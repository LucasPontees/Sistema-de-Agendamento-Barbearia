import { TYPES } from "@/types";
import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { IAgendamentoRepository } from "./repository/agendamento.repository";
import { Agendamento } from "@prisma/client";

@Injectable()
export class ReturnAgendamentosPorIdUsecase {
  constructor(
    @Inject(TYPES.AgendamentoRepository)
    private readonly iAgendamentoRepository: IAgendamentoRepository,
  ) {}

  async returnAgendamentoPorId(
    agendamentoId: number,
  ): Promise<Agendamento | null> {
    const agendamento =
      await this.iAgendamentoRepository.returnAgendamentoPorId(agendamentoId);

    if (!agendamento) {
      throw new ConflictException("Agendamento não encontrado");
    }

    return this.iAgendamentoRepository.returnAgendamentoPorId(agendamentoId);
  }
}
