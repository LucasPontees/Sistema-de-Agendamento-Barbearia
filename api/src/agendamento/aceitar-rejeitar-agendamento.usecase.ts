import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { TYPES } from "@/types";
import { IAgendamentoRepository } from "../agendamento/repository/agendamento.repository";

@Injectable()
export class AceitarRejeitarAgendamentoUsecase {
  constructor(
    @Inject(TYPES.AgendamentoRepository)
    private readonly iAgendamentoRepository: IAgendamentoRepository
  ) {}
  async aceitarRejeitarAgendamento(
    agendamentoId: number,
    acao: "CONFIRMADO" | "CANCELADO" | "REJEITADO"
  ) {
    const existeAgendamento =
      await this.iAgendamentoRepository.returnAgendamentoPorId(agendamentoId);
    if (!existeAgendamento) {
      throw new ConflictException("Agendamento não encontrado");
    }

    const agendamento =
      await this.iAgendamentoRepository.aceitarRejeitarAgendamento(
        agendamentoId,
        acao
      );

    return {
      message: `Agendamento atualizado para ${acao.toLowerCase()}`,
      agendamento,
    };
  }
}
