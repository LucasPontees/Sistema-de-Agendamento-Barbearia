import { Injectable } from "@nestjs/common";
import { IAgendamentoRepository } from "./agendamento.repository";
import { Agendamento, StatusAgendamento } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { CreateAgendamentoDto } from "../dto/create-agendamento.dto";
@Injectable()
export class PrismaAgendamentoRepository implements IAgendamentoRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    data: CreateAgendamentoDto,
    usuarioId: number,
    empresaId
  ): Promise<Agendamento> {
    return this.prisma.agendamento.create({
      data: {
        ...data,
        usuarioId,
        empresaId,
      },
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

  async returnAgendamentoPorId(
    agendamentoId: number
  ): Promise<Agendamento | null> {
    return this.prisma.agendamento.findFirst({
      where: { id: agendamentoId },
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

  async aceitarRejeitarAgendamento(
    agendamentoId: number,
    acao: Extract<StatusAgendamento, "CONFIRMADO" | "CANCELADO" | "REJEITADO">
  ): Promise<Agendamento> {
    return this.prisma.agendamento.update({
      where: { id: agendamentoId },
      include: {
        usuario: {
          select: {
            nome: true,
          },
        },
        servico: {
          select: {
            nome: true,
          },
        },
      },
      data: { status: acao },
    });
  }
}
