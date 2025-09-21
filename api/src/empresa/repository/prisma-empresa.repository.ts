import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { IEmpresaRepository } from "./empresa.repository";
import { CreateEmpresaDto } from "../dto/create-empresa.dto";
import { UserRole } from "@/usuario/enum/role";
import { Empresa } from "../entities/empresa.entity";
@Injectable()
export class PrismaEmpresaRepository implements IEmpresaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateEmpresaDto): Promise<Empresa> {
    const empresa = await this.prisma.empresa.create({
      data: {
        email: data.email,
        cnpj: data.cnpj,
        endereco: data.endereco,
        telefone: data.telefone,
        nomeFantasia: data.nomeFantasia,
        role: data.role,
        descricao: data.descricao,
        logo: data.logo,
        horariosFuncionamento: data.horariosFuncionamento,
      },
    });
    return new Empresa(
      empresa.id,
      empresa.nomeFantasia,
      empresa.cnpj,
      empresa.telefone,
      empresa.email,
      empresa.endereco,
      empresa.role as UserRole,
      empresa.descricao || undefined,
      empresa.logo || undefined,
    );
  }

  async findByCnpj(cnpj: string): Promise<Empresa | null> {
    const empresa = await this.prisma.empresa.findUnique({ where: { cnpj } });

    if (!empresa) return null;
    return new Empresa(
      empresa.id,
      empresa.nomeFantasia,
      empresa.cnpj,
      empresa.telefone,
      empresa.email,
      empresa.endereco,
      empresa.role as UserRole,
      empresa.descricao || undefined,
      empresa.logo || undefined,
    );
  }
  async findById(id: number): Promise<Empresa | null> {
    const empresa = await this.prisma.empresa.findUnique({ where: { id } });

    if (!empresa) return null;
    return new Empresa(
      empresa.id,
      empresa.nomeFantasia,
      empresa.cnpj,
      empresa.telefone,
      empresa.email,
      empresa.endereco,
      empresa.role as UserRole,
      empresa.descricao || undefined,
      empresa.logo || undefined,
    );
  }

  async findAll(): Promise<Empresa[]> {
    const empresa = await this.prisma.empresa.findMany();
    if (!empresa) return [];
    return empresa.map((empresa) => {
      return new Empresa(
        empresa.id,
        empresa.nomeFantasia,
        empresa.cnpj,
        empresa.telefone,
        empresa.email,
        empresa.endereco,
        empresa.role as UserRole,
        empresa.descricao || undefined,
        empresa.logo || undefined,
      );
    });
  }
}
