import { Controller, Post, Body, Get, Query } from "@nestjs/common";
import { CreateAgendamentoUsecase } from "./agendamento.usecase";
import { CreateAgendamentoDto } from "./dto/create-agendamento.dto";
import { RetornaAgendamentosEmpresaUsecase } from "./retorna-agendamentos-empresa.usecase";

@Controller("agendamento")
export class AgendamentoController {
  constructor(
    private readonly createAgendamentoUsecase: CreateAgendamentoUsecase,
    private readonly retornaAgendamentosEmpresaUsecase: RetornaAgendamentosEmpresaUsecase
  ) {}

  @Post()
  create(@Body() dto: CreateAgendamentoDto) {
    return this.createAgendamentoUsecase.create(dto);
  }

  @Get()
  getAll(@Query("empresaId") empresaId: number) {
    return this.retornaAgendamentosEmpresaUsecase.retornaAgendamentos(
      empresaId
    );
  }
}
