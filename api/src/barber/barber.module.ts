import { Module } from "@nestjs/common";
import { CreateBarberUseCase } from "./create-barber.usecase";
import { BarberController } from "./barber.controller";
import { TYPES } from "../types";
import { PrismaBarberRepository } from "./repository/prisma-barber.repository";
import { CreateEmpresaUseCase } from "@/empresa/create-empresa.usecase";
import { PrismaEmpresaRepository } from "@/empresa/repository/prisma-empresa.repository";
import { UpdateBarberUseCase } from "./update-barber.usecase";
import { HashArgon2 } from "@/usuario/hash/hash-argon2";
import { PrismaUserRepository } from "@/usuario/repository/prisma-user.repository";
import { RetornaBarbeirosEmpresaUsecase } from "./retorna-barbeiros-empresa.usecase";

@Module({
  controllers: [BarberController],
  providers: [
    RetornaBarbeirosEmpresaUsecase,
    CreateBarberUseCase,

    {
      provide: TYPES.BarberRepository,
      useClass: PrismaBarberRepository,
    },
    UpdateBarberUseCase,
    {
      provide: TYPES.BarberRepository,
      useClass: PrismaBarberRepository,
    },
    CreateEmpresaUseCase,
    {
      provide: TYPES.EmpresaRepository,
      useClass: PrismaEmpresaRepository,
    },
    {
      provide: TYPES.Hasher,
      useClass: HashArgon2,
    },
    {
      provide: TYPES.UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class BarbeiroModule {}
