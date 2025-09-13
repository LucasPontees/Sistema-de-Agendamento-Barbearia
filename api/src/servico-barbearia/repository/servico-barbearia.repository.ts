import { Prisma, Servico } from "@prisma/client";

export interface IServicoBarbeariaRepository {
  create(data: Prisma.ServicoCreateInput): Promise<Servico>;
  findById(empresaId: number, id: number): Promise<Servico | null>;
}
