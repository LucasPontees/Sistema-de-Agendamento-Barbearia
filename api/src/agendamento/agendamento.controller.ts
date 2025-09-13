import { Controller, Post, Body, Get, Query, Param } from "@nestjs/common";
import { CreateAgendamentoUsecase } from "./agendamento.usecase";
import { CreateAgendamentoDto } from "./dto/create-agendamento.dto";
import { RetornaAgendamentosEmpresaUsecase } from "./retorna-agendamentos-empresa.usecase";
import { ReturnAgendamentosPorIdUsecase } from "./retorna-agendamentos-por-id.usecase";

@Controller("agendamento")
export class AgendamentoController {
  constructor(
    private readonly createAgendamentoUsecase: CreateAgendamentoUsecase,
    private readonly retornaAgendamentosEmpresaUsecase: RetornaAgendamentosEmpresaUsecase,
    private readonly returnAgendamentosPorIdUsecase: ReturnAgendamentosPorIdUsecase
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
  @Get(":id")
  getAgendamentosById(
    @Param("id") id: number,
    @Query("empresaId") empresaId: number
  ) {
    return this.returnAgendamentosPorIdUsecase.returnAgendamentoPorId(
      id,
      empresaId
    );
  }
}
