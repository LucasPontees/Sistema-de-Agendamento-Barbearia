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
}
