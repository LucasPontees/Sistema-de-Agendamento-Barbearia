import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { IEmpresaRepository } from "./empresa.repository";
import { Empresa, Prisma } from "@prisma/client";

@Injectable()
export class PrismaEmpresaRepository implements IEmpresaRepository {
  constructor(private readonly prisma: PrismaService) {}
  findByCnpj(cnpj: string): Promise<Empresa | null> {
    return this.prisma.empresa.findUnique({ where: { cnpj } });
  }

  create(data: Prisma.EmpresaCreateInput) {
    return this.prisma.empresa.create({ data });
  }

  findById(id: number): Promise<Empresa | null> {
    return this.prisma.empresa.findUnique({ where: { id } });
  }

  findAll(): Promise<Empresa[]> {
    return this.prisma.empresa.findMany();
  }
}
