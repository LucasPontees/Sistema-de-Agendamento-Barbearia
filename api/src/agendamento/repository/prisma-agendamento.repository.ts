import { Injectable } from "@nestjs/common";
import { IAgendamentoRepository } from "./agendamento.repository";
import { Agendamento, StatusAgendamento } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { CreateAgendamentoRequest } from "../agendamento.usecase";
@Injectable()
export class PrismaAgendamentoRepository implements IAgendamentoRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateAgendamentoRequest): Promise<Agendamento> {
    return this.prisma.agendamento.create({
      data: {
        dataHora: new Date(data.dataHora),
        usuario: { connect: { id: data.usuarioId } },
        empresa: { connect: { id: data.empresaId } },
        barbeiro: data.barbeiroId
          ? { connect: { id: data.barbeiroId } }
          : undefined,
        servico: { connect: { id: data.servicoId } },
        observacoes: data.observacoes,
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
    agendamentoId: number,
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
    acao: Extract<StatusAgendamento, "CONFIRMADO" | "CANCELADO" | "REJEITADO">,
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
