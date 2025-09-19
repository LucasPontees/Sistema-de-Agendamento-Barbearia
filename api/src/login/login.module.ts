import { Module } from "@nestjs/common";
// import { LoginService } from "./login.service";
import { AuthController } from "./login.controller";
import { PrismaLoginRepository } from "./repository/prisma-login.repository";
import { PrismaUserRepository } from "@/usuario/repository/prisma-user.repository";
import { TYPES } from "@/types";
import { JwtStrategy } from "./strategies/jwt-strategy";

@Module({
  controllers: [AuthController],
  providers: [
    PrismaLoginRepository,
    {
      provide: TYPES.UserRepository,
      useClass: PrismaUserRepository,
    },
    JwtStrategy,
  ],
  exports: [JwtStrategy],
})
export class LoginModule {}
