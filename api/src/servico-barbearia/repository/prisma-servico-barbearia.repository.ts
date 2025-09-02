import { Prisma, Servico } from "@prisma/client";
import { IServicoBarbeariaRepository } from "./servico-barbearia.repository";
import { PrismaService } from "../../../prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaServicoBarbeariaRepository
  implements IServicoBarbeariaRepository
{
  constructor(private readonly prisma: PrismaService) {}
  create(data: Prisma.ServicoCreateInput): Promise<Servico> {
    return this.prisma.servico.create({ data });
  }
}
