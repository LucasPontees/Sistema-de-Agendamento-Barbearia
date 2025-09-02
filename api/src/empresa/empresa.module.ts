import { Module } from "@nestjs/common";
import { CreateEmpresaUseCase } from "./create-empresa.usecase";
import { EmpresaController } from "./empresa.controller";
import { TYPES } from "../types";
import { PrismaEmpresaRepository } from "./repository/prisma-empresa.repository";

@Module({
  controllers: [EmpresaController],
  providers: [
    CreateEmpresaUseCase,
    {
      provide: TYPES.EmpresaRepository,
      useClass: PrismaEmpresaRepository,
    },
  ],
})
export class EmpresaModule {}
