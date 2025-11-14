import { Module } from "@nestjs/common";
import { ServicoBarbeariaUseCase } from "./servico-barbearia.usecase";
import { ServicoBarbeariaController } from "./servico-barbearia.controller";
import { TYPES } from "@/types";
import { PrismaEmpresaRepository } from "@/empresa/repository/prisma-empresa.repository";
import { PrismaServicoBarbeariaRepository } from "./repository/prisma-servico-barbearia.repository";
import { ListarServicoIdUseCase } from "./listar-servico-id-company.usecase";
import { HashArgon2 } from "@/usuario/hash/hash-argon2";
@Module({
  controllers: [ServicoBarbeariaController],
  providers: [
    ListarServicoIdUseCase,
    ServicoBarbeariaUseCase,
    {
      provide: TYPES.ServicoBarbeariaRepository,
      useClass: PrismaServicoBarbeariaRepository,
    },
    {
      provide: TYPES.EmpresaRepository,
      useClass: PrismaEmpresaRepository,
    },
    {
      provide: TYPES.Hasher,
      useClass: HashArgon2,
    },
  ],
})
export class ServicoBarbeariaModule {}
