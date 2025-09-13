import { Agendamento, Prisma } from "@prisma/client";

export interface IAgendamentoRepository {
  create(data: Prisma.AgendamentoCreateInput): Promise<Agendamento>;
  returnAgendamentoPorEmpresa(empresaId: number): Promise<Agendamento[]>;
  returnAgendamentoPorId(agendamentoId: number): Promise<Agendamento | null>;
  aceitarRejeitarAgendamento(
    agendamentoId: number,
    acao: "CONFIRMADO" | "CANCELADO" | "REJEITADO"
  ): Promise<Agendamento>;
}
