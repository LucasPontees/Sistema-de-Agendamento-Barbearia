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
import { CreateAgendamentoUsecase } from "./agendamento.usecase";
import { CreateAgendamentoDto } from "./dto/create-agendamento.dto";
import { RetornaAgendamentosEmpresaUsecase } from "./retorna-agendamentos-empresa.usecase";
import { ReturnAgendamentosPorIdUsecase } from "./retorna-agendamentos-por-id.usecase";
import { AceitarRejeitarAgendamentoUsecase } from "./aceitar-rejeitar-agendamento.usecase";
import { AtualizaStatusAgendamentoDto } from "./dto/status-agendamento.dto";
import { Request } from "express";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "@/login/strategies/roles.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "@/login/strategies/roles.decorator";
import { UserRole } from "@/usuario/enum/role";
import { JwtPayload } from "@/login/strategies/jwt-strategy";

interface RequestWithUser extends Request {
  user: JwtPayload;
}

@Controller("agendamento")
export class AgendamentoController {
  constructor(
    private readonly createAgendamentoUsecase: CreateAgendamentoUsecase,
    private readonly retornaAgendamentosEmpresaUsecase: RetornaAgendamentosEmpresaUsecase,
    private readonly returnAgendamentosPorIdUsecase: ReturnAgendamentosPorIdUsecase,
    private readonly aceitarRejeitarAgendamentoUsecase: AceitarRejeitarAgendamentoUsecase,
  ) {}

  @Post()
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @ApiBearerAuth("JWT-auth")
  @Roles(UserRole.EMPRESA)
  create(@Req() req: RequestWithUser, @Body() dto: CreateAgendamentoDto) {
    const usuarioId = Number(req.user.sub);
    const empresaId = req.user.empresaId;

    return this.createAgendamentoUsecase.create(dto, usuarioId, empresaId);
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
