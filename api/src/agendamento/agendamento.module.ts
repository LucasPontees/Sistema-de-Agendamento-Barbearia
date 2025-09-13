import { Module } from "@nestjs/common";
import { CreateAgendamentoUsecase } from "./agendamento.usecase";
import { AgendamentoController } from "./agendamento.controller";
import { TYPES } from "@/types";
import { PrismaAgendamentoRepository } from "./repository/prisma-agendamento.repository";
import { PrismaBarberRepository } from "@/barber/repository/prisma-barber.repository";
import { PrismaServicoBarbeariaRepository } from "@/servico-barbearia/repository/prisma-servico-barbearia.repository";
import { PrismaEmpresaRepository } from "@/empresa/repository/prisma-empresa.repository";
import { PrismaUserRepository } from "@/usuario/repository/prisma-user.repository";
@Module({
  controllers: [AgendamentoController],
  providers: [
    CreateAgendamentoUsecase,
    {
      provide: TYPES.AgendamentoRepository,
      useClass: PrismaAgendamentoRepository,
    },
    {
      provide: TYPES.BarberRepository,
      useClass: PrismaBarberRepository,
    },
    {
      provide: TYPES.ServicoBarbeariaRepository,
      useClass: PrismaServicoBarbeariaRepository,
    },
    {
      provide: TYPES.EmpresaRepository,
      useClass: PrismaEmpresaRepository,
    },
    {
      provide: TYPES.UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class AgendamentoModule {}
