import { Controller, Post, Body } from "@nestjs/common";
import { CreateAgendamentoUsecase } from "./agendamento.usecase";
import { CreateAgendamentoDto } from "./dto/create-agendamento.dto";

@Controller("agendamento")
export class AgendamentoController {
  constructor(
    private readonly createAgendamentoUsecase: CreateAgendamentoUsecase,
  ) {}

  @Post()
  create(@Body() dto: CreateAgendamentoDto) {
    return this.createAgendamentoUsecase.create(dto);
  }
}
