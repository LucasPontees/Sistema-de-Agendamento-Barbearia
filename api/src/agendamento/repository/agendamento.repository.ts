import { Agendamento } from "@prisma/client";
import { CreateAgendamentoDto } from "../dto/create-agendamento.dto";

export interface IAgendamentoRepository {
  create(data: CreateAgendamentoDto): Promise<Agendamento>;
  returnAgendamentoPorEmpresa(empresaId: number): Promise<Agendamento[]>;
  returnAgendamentoPorId(agendamentoId: number): Promise<Agendamento | null>;
  aceitarRejeitarAgendamento(
    agendamentoId: number,
    acao: "CONFIRMADO" | "CANCELADO" | "REJEITADO",
  ): Promise<Agendamento>;
}
