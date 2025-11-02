import { Injectable } from "@nestjs/common";
import { StatusAgendamento } from "@prisma/client";

@Injectable()
export class StatusAgendamentoService {
  listarStatus() {
    // Retorna todos os valores do enum
    return Object.values(StatusAgendamento);
  }
}
