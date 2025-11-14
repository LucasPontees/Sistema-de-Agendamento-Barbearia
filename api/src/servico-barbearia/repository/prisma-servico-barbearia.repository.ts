import { Servico } from "@prisma/client";
import { IServicoBarbeariaRepository } from "./servico-barbearia.repository";
import { PrismaService } from "../../../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateServicoBarbeariaDto } from "../dto/create-servico-barbearia.dto";

@Injectable()
export class PrismaServicoBarbeariaRepository
  implements IServicoBarbeariaRepository
{
  constructor(private readonly prisma: PrismaService) {}
  create(data: CreateServicoBarbeariaDto, empresaId: number): Promise<Servico> {
    return this.prisma.servico.create({ data: { ...data, empresaId } });
  }

  async findServicoByIdCompany(empresaId: number): Promise<Servico[] | null> {
    return this.prisma.servico.findMany({
      where: {
        empresaId,
      },
    });
  }
}
