import { Injectable } from "@nestjs/common";
import { CreateAgendamentoDto } from "./dto/create-agendamento.dto";

@Injectable()
export class CreateAgendamentoUsecase {
  create(createAgendamentoDto: CreateAgendamentoDto) {
    return "This action adds a new agendamento";
  }
}
