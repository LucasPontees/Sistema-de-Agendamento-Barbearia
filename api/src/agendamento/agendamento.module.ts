import { Module } from "@nestjs/common";
import { CreateAgendamentoUsecase } from "./agendamento.usecase";
import { AgendamentoController } from "./agendamento.controller";
import { TYPES } from "@/types";
import { PrismaAgendamentoRepository } from "./repository/prisma-agendamento.repository";
import { PrismaBarberRepository } from "@/barber/repository/prisma-barber.repository";
import { PrismaServicoBarbeariaRepository } from "@/servico-barbearia/repository/prisma-servico-barbearia.repository";
import { PrismaEmpresaRepository } from "@/empresa/repository/prisma-empresa.repository";
import { PrismaUserRepository } from "@/usuario/repository/prisma-user.repository";
import { RetornaAgendamentosEmpresaUsecase } from "./retorna-agendamentos-empresa.usecase";
import { ReturnAgendamentosPorIdUsecase } from "./retorna-agendamentos-por-id.usecase";
import { AceitarRejeitarAgendamentoUsecase } from "./aceitar-rejeitar-agendamento.usecase";
import { HashArgon2 } from "@/usuario/hash/hash-argon2";
import { RetornaAgendamentosClienteUsecase } from "./retorna-agendamentos-cliente.usecase";
import { IBarberRepository } from "@/barber/repository/barber.repository";

@Module({
  controllers: [AgendamentoController],
  providers: [
    RetornaAgendamentosEmpresaUsecase,
    RetornaAgendamentosClienteUsecase,
    AceitarRejeitarAgendamentoUsecase,
    ReturnAgendamentosPorIdUsecase,
    CreateAgendamentoUsecase,
    {
      provide: TYPES.AgendamentoRepository,
      useClass: PrismaAgendamentoRepository,
    },
    {
      provide: IBarberRepository,
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
    {
      provide: TYPES.Hasher,
      useClass: HashArgon2,
    },
  ],
})
export class AgendamentoModule {}
