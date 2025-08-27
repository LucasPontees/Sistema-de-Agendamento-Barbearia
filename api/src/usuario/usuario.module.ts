import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { PrismaUserRepository } from "./repository/prisma-user.repository";
import { CreateUserUseCase } from "./create-user.usecase";

@Module({
  controllers: [UsuarioController],
  providers: [
    CreateUserUseCase,
    {
      provide: "IUserRepository",
      useClass: PrismaUserRepository,
    },
  ],
})
export class UsuarioModule {}
