import { Prisma, Servico } from "@prisma/client";

export interface IServicoBarbeariaRepository {
  create(data: Prisma.ServicoCreateInput): Promise<Servico>;
}
