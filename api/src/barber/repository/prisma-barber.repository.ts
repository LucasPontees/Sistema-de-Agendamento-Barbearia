import { Injectable } from "@nestjs/common";
import { IBarberRepository } from "./barber.repository";
import { PrismaService } from "prisma/prisma.service";
import { Prisma, Barbeiro } from "@prisma/client";

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

  async create(data: Prisma.BarbeiroCreateInput): Promise<Barbeiro> {
    return this.prisma.barbeiro.create({
      data,
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
}
