import { Module } from "@nestjs/common";
import { CreateEmpresaUseCase } from "./create-empresa.usecase";
import { EmpresaController } from "./empresa.controller";
import { TYPES } from "../types";
import { PrismaEmpresaRepository } from "./repository/prisma-empresa.repository";
import { ListarTodasEmpresasUseCase } from "./listar-todas-empresas.usecase";

@Module({
  controllers: [EmpresaController],
  providers: [
    ListarTodasEmpresasUseCase,
    CreateEmpresaUseCase,
    {
      provide: TYPES.EmpresaRepository,
      useClass: PrismaEmpresaRepository,
    },
  ],
})
export class EmpresaModule {}
