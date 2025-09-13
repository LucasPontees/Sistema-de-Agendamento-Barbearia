import { TYPES } from "@/types";
import { Inject, Injectable } from "@nestjs/common";
import { IAgendamentoRepository } from "./repository/agendamento.repository";
import { Agendamento } from "@prisma/client";

@Injectable()
export class RetornaAgendamentosEmpresaUsecase {
  constructor(
    @Inject(TYPES.AgendamentoRepository)
    private readonly iAgendamentoRepository: IAgendamentoRepository,
  ) {}

  async retornaAgendamentos(empresaId: number): Promise<Agendamento[]> {
    return this.iAgendamentoRepository.returnAgendamentoPorEmpresa(empresaId);
  }
}
