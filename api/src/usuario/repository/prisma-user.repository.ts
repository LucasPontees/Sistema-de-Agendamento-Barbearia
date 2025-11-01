import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { IUserRepository } from "./user.repository";
import { CreateUsuarioDto } from "../dto/create-usuario.dto";
import { User } from "../entities/user.entity";
import { UserRole } from "../enum/role";
import { Prisma } from "@prisma/client";

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUsuarioDto, empresaId: number): Promise<User> {
    const usuario = await this.prisma.usuario.create({
      data: {
        email: data.email,
        senha: data.senha,
        nome: data.nome,
        role: data.role,
        telefone: data.telefone,
        fotoPerfil: data.fotoPerfil,
        dataNascimento: data.dataNascimento,
        empresaId: empresaId,
      } as Prisma.UsuarioUncheckedCreateInput,
    });

    return new User(
      usuario.id,
      usuario.email,
      usuario.role as UserRole,
      usuario.nome,
      usuario.senha,
      usuario.telefone,
      usuario.fotoPerfil || undefined,
      usuario.dataNascimento || undefined,
      usuario.empresaId || undefined
    );
  }

  async findByEmail(email: string): Promise<User | null> {
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
      },
    });
    if (!usuario) return null;

    return new User(
      usuario.id,
      usuario.email,
      usuario.role as UserRole,
      usuario.nome,
      usuario.senha,
      usuario.telefone,
      usuario.fotoPerfil || undefined,
      usuario.dataNascimento || undefined,
      usuario.empresaId || undefined
    );
  }

  async findUserById(id: number): Promise<User | null> {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });

    if (!usuario) return null;

    return new User(
      usuario.id,
      usuario.email,
      usuario.role as UserRole,
      usuario.nome,
      usuario.senha,
      usuario.telefone,
      usuario.fotoPerfil || undefined,
      usuario.dataNascimento || undefined
    );
  }
}
