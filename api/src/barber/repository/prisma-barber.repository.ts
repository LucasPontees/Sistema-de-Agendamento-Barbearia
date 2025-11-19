import { Injectable } from "@nestjs/common";
import { IBarberRepository } from "./barber.repository";
import { PrismaService } from "prisma/prisma.service";
import { Prisma, Barbeiro } from "@prisma/client";
import { CreateBarberDto } from "../dto/create-barber.dto";

@Injectable()
export class PrismaBarberRepository implements IBarberRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findByEmail(
    email: string,
    companyId: number
  ): Promise<Barbeiro | null> {
    return this.prisma.barbeiro.findFirst({
      where: {
        email,
        empresa: {
          id: companyId,
        },
      },
    });
  }

  async create(data: CreateBarberDto, empresaId: number): Promise<Barbeiro> {
    return this.prisma.barbeiro.create({
      data: {
        ...data,
        empresaId,
      },
    });
  }

  async updateBarber(
    id: number,
    data: Partial<Prisma.BarbeiroUpdateInput>
  ): Promise<Barbeiro> {
    return this.prisma.barbeiro.update({
      where: {
        id,
      },
      data,
    });
  }

  async findById(id: number): Promise<Barbeiro | null> {
    return this.prisma.barbeiro.findUnique({
      where: {
        id,
      },
    });
  }

  async returnBarbeirosPorEmpresa(empresaId: number): Promise<Barbeiro[]> {
    return this.prisma.barbeiro.findMany({
      where: { empresaId },
    });
  }
}
