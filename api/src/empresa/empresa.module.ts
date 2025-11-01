import { Module } from "@nestjs/common";
import { CreateEmpresaUseCase } from "./create-empresa.usecase";
import { EmpresaController } from "./empresa.controller";
import { TYPES } from "../types";
import { PrismaEmpresaRepository } from "./repository/prisma-empresa.repository";
import { ListarTodasEmpresasUseCase } from "./listar-todas-empresas.usecase";
import { ListarEmpresaIdUseCase } from "./listar_empresa-id.usecase";
import { PrismaUserRepository } from "@/usuario/repository/prisma-user.repository";
import { HashArgon2 } from "@/usuario/hash/hash-argon2";
import { CreateUserUseCase } from "@/usuario/create-user.usecase";

@Module({
  controllers: [EmpresaController],
  providers: [
    ListarEmpresaIdUseCase,
    ListarTodasEmpresasUseCase,
    CreateEmpresaUseCase,
    CreateUserUseCase,
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
export class EmpresaModule {}
