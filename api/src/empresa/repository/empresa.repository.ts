import { Empresa, Prisma } from "@prisma/client";

export interface IEmpresaRepository {
  create(data: Prisma.EmpresaCreateInput): Promise<Empresa>;
  findByCnpj(cnpj: string): Promise<Empresa | null>;
}
