import { Module } from "@nestjs/common";
import { ServicoBarbeariaUseCase } from "./servico-barbearia.usecase";
import { ServicoBarbeariaController } from "./servico-barbearia.controller";
import { TYPES } from "@/types";
import { PrismaServicoBarbeariaRepository } from "./repository/prisma-servico-barbearia.repository";
@Module({
  controllers: [ServicoBarbeariaController],
  providers: [
    ServicoBarbeariaUseCase,
    {
      provide: TYPES.ServicoBarbeariaRepository,
      useClass: PrismaServicoBarbeariaRepository,
    },
  ],
})
export class ServicoBarbeariaModule {}
