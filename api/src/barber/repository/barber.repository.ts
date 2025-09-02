import { Barbeiro, Prisma } from "@prisma/client";

export interface IBarberRepository {
  create(data: Prisma.BarbeiroCreateInput): Promise<Barbeiro>;
  findByEmail(cpf: string, companyId: number): Promise<Barbeiro | null>;
}
