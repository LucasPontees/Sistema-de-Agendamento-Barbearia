import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { PrismaUserRepository } from "./repository/prisma-user.repository";
import { CreateUserUseCase } from "./create-user.usecase";
import { HashArgon2 } from "./hash/hash-argon2";
import { TYPES } from "./types";
@Module({
  controllers: [UsuarioController],
  providers: [
    CreateUserUseCase,
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
export class UsuarioModule {}
