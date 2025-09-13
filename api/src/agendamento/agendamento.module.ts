import { Module } from "@nestjs/common";
import { CreateAgendamentoUsecase } from "./agendamento.usecase";
import { AgendamentoController } from "./agendamento.controller";

@Module({
  controllers: [AgendamentoController],
  providers: [CreateAgendamentoUsecase],
})
export class AgendamentoModule {}
