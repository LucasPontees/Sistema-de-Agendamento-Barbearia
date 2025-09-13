import { Injectable } from "@nestjs/common";
import { IAgendamentoRepository } from "./agendamento.repository";
import { Prisma, Agendamento } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
@Injectable()
export class PrismaAgendamentoRepository implements IAgendamentoRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: Prisma.AgendamentoCreateInput): Promise<Agendamento> {
    return this.prisma.agendamento.create({
      data,
    });
  }

  async returnAgendamentoPorEmpresa(empresaId: number): Promise<Agendamento[]> {
    return this.prisma.agendamento.findMany({
      where: { empresaId },
      include: {
        usuario: {
          select: {
            nome: true,
            email: true,
            telefone: true,
            dataNascimento: true,
            fotoPerfil: true,
          },
        },
        barbeiro: {
          select: { nome: true, fotoPerfil: true },
        },
        servico: {
          select: { nome: true, descricao: true, preco: true },
        },
      },
    });
  }
}
