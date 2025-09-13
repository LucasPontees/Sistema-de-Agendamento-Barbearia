import { Inject, Injectable } from "@nestjs/common";
import { TYPES } from "../types";
import { Agendamento } from "@prisma/client";
import { IAgendamentoRepository } from "./repository/agendamento.repository";

export interface CreateAgendamentoRequest {
  dataHora: string;
  usuarioId: number;
  empresaId: number;
  barbeiroId?: number;
  servicoId: number;
  observacoes?: string;
}

@Injectable()
export class CreateAgendamentoUsecase {
  constructor(
    @Inject(TYPES.AgendamentoRepository)
    private readonly iAgendamentoRepository: IAgendamentoRepository,
  ) {}
  create(request: CreateAgendamentoRequest): Promise<Agendamento> {
    return this.iAgendamentoRepository.create({
      dataHora: new Date(request.dataHora),
      usuario: { connect: { id: request.usuarioId } },
      empresa: { connect: { id: request.empresaId } },
      barbeiro: request.barbeiroId
        ? { connect: { id: request.barbeiroId } }
        : undefined,
      servico: { connect: { id: request.servicoId } },
      observacoes: request.observacoes,
    });
  }
}
