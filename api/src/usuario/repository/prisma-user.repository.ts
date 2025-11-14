import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { IUserRepository } from "./user.repository";
import { CreateUsuarioDto } from "../dto/create-usuario.dto";
import { Usuario } from "@prisma/client";

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUsuarioDto, empresaId: number): Promise<Usuario> {
    return this.prisma.usuario.create({
      data: {
        ...data,
        role: "USUARIO",
        empresaId,
      },
    });
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findFirst({
      where: { email },
      select: {
        id: true,
        email: true,
        role: true,
        nome: true,
        senha: true,
        telefone: true,
        fotoPerfil: true,
        dataNascimento: true,
        empresaId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!usuario) return null;

    return usuario;
  }

  async findUserById(id: number): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });

    if (!usuario) return null;

    return usuario;
  }
}
