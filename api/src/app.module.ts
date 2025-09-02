import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "../prisma/prisma.module";
import { UsuarioModule } from "./usuario/usuario.module";
import { EmpresaModule } from "./empresa/empresa.module";
import { BarbeiroModule } from "./barber/barber.module";
import { ServicoBarbeariaModule } from "./servico-barbearia/servico-barbearia.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "uploads"),
      serveRoot: "/uploads",
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsuarioModule,
    EmpresaModule,
    BarbeiroModule,
    ServicoBarbeariaModule,
  ],
})
export class AppModule {}
