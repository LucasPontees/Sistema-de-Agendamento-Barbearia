import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { IEmpresaRepository } from "./empresa.repository";
import { CreateEmpresaDto } from "../dto/create-empresa.dto";
import { UserRole } from "@/usuario/enum/role";
import { Empresa } from "../entities/empresa.entity";
import { IHasher } from "@/usuario/hash/hasher";
import { TYPES } from "@/types";

@Injectable()
export class PrismaEmpresaRepository implements IEmpresaRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(TYPES.Hasher)
    private readonly hasher: IHasher
  ) {}

  async create(data: CreateEmpresaDto): Promise<Empresa> {
    const senhaHash = await this.hasher.hash(data.usuario.senha);

    const empresa = await this.prisma.empresa.create({
      data: {
        email: data.email,
        cnpj: data.cnpj,
        endereco: data.endereco,
        telefone: data.telefone,
        nomeFantasia: data.nomeFantasia,
        descricao: data.descricao || null,
        logo: data.logo,
        horariosFuncionamento: data.horariosFuncionamento,
        usuarios: {
          create: {
            nome: data.usuario.nome,
            email: data.usuario.email,
            senha: senhaHash,
            role: UserRole.EMPRESA,
            telefone: data.usuario.telefone,
          },
        },
      },
    });
    return empresa;
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
      empresa.descricao || null,
      empresa.logo || undefined
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
      empresa.descricao || null,
      empresa.logo || null
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
        empresa.descricao || null,
        empresa.logo || null
      );
    });
  }
}
