import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { IUserRepository } from "./user.repository";
import { Prisma, Usuario } from "@prisma/client";

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}
  findByEmail(email: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { email } });
  }

  create(data: Prisma.UsuarioCreateInput) {
    return this.prisma.usuario.create({ data });
  }
}
