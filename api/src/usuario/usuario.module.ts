import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { PrismaUserRepository } from "./repository/prisma-user.repository";
import { CreateUserUseCase } from "./create-user.usecase";
import { IUserRepository } from "./repository/user.repository";
import { Hasher } from "./hash/hasher";
import { HashArgon2 } from "./hash/hash-argon2";

@Module({
  controllers: [UsuarioController],
  providers: [
    CreateUserUseCase,
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: Hasher,
      useClass: HashArgon2,
    },
  ],
})
export class UsuarioModule {}
