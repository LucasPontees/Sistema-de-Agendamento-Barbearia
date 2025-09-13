import { Module } from "@nestjs/common";
import { CreateAgendamentoUsecase } from "./agendamento.usecase";
import { AgendamentoController } from "./agendamento.controller";
import { TYPES } from "@/types";
import { PrismaAgendamentoRepository } from "./repository/prisma-agendamento.repository";

@Module({
  controllers: [AgendamentoController],
  providers: [
    CreateAgendamentoUsecase,
    {
      provide: TYPES.AgendamentoRepository,
      useClass: PrismaAgendamentoRepository,
    },
  ],
})
export class AgendamentoModule {}
