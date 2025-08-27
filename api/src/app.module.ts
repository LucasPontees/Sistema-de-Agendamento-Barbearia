import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "../prisma/prisma.module";
import { UsuarioModule } from "./usuario/usuario.module";

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
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
