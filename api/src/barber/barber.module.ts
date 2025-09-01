import { Module } from "@nestjs/common";
import { CreateBarberUseCase } from "./create-barber.usecase";
import { BarberController } from "./barber.controller";
import { TYPES } from "../usuario/types";
import { PrismaBarberRepository } from "./repository/prisma-barber.repository";
import { CreateEmpresaUseCase } from "@/empresa/create-empresa.usecase";
import { PrismaEmpresaRepository } from "@/empresa/repository/prisma-empresa.repository";

@Module({
  controllers: [BarberController],
  providers: [
    CreateBarberUseCase,
    {
      provide: TYPES.BarberRepository,
      useClass: PrismaBarberRepository,
    },
    CreateEmpresaUseCase,
    {
      provide: TYPES.EmpresaRepository,
      useClass: PrismaEmpresaRepository,
    },
  ],
})
export class BarbeiroModule {}
