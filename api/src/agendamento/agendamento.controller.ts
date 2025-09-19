import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  UseGuards,
  Req,
} from "@nestjs/common";
import {
  CreateAgendamentoRequest,
  CreateAgendamentoUsecase,
} from "./agendamento.usecase";
import { CreateAgendamentoDto } from "./dto/create-agendamento.dto";
import { RetornaAgendamentosEmpresaUsecase } from "./retorna-agendamentos-empresa.usecase";
import { ReturnAgendamentosPorIdUsecase } from "./retorna-agendamentos-por-id.usecase";
import { AceitarRejeitarAgendamentoUsecase } from "./aceitar-rejeitar-agendamento.usecase";
import { AtualizaStatusAgendamentoDto } from "./dto/status-agendamento.dto";
import { JwtAuthGuard } from "@/login/strategies/jwt-guard";
import { Request } from "express";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

@Controller("agendamento")
export class AgendamentoController {
  constructor(
    private readonly createAgendamentoUsecase: CreateAgendamentoUsecase,
    private readonly retornaAgendamentosEmpresaUsecase: RetornaAgendamentosEmpresaUsecase,
    private readonly returnAgendamentosPorIdUsecase: ReturnAgendamentosPorIdUsecase,
    private readonly aceitarRejeitarAgendamentoUsecase: AceitarRejeitarAgendamentoUsecase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateAgendamentoDto, @Req() req: AuthenticatedRequest) {
    const usuario = req.user;

    const request: CreateAgendamentoRequest = {
      ...dto,
      usuarioId: Number(usuario.id),
    };
    return this.createAgendamentoUsecase.create(request);
  }

  @Get()
  getAll(@Query("empresaId") empresaId: number) {
    return this.retornaAgendamentosEmpresaUsecase.retornaAgendamentos(
      empresaId,
    );
  }
  @Get(":id")
  getAgendamentosById(@Param("id") id: number) {
    return this.returnAgendamentosPorIdUsecase.returnAgendamentoPorId(id);
  }

  @Patch("status/:id")
  aceitarRejeitarAgendamento(
    @Param("id") id: number,
    @Body() dto: AtualizaStatusAgendamentoDto,
  ) {
    return this.aceitarRejeitarAgendamentoUsecase.aceitarRejeitarAgendamento(
      id,
      dto.acao,
    );
  }
}
