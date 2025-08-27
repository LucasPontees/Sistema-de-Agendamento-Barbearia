import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { IUserRepository } from "./user.repository";

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    dataNascimento: string;
    fotoPerfil: string;
  }) {
    return this.prisma.usuario.create({ data });
  }
}
