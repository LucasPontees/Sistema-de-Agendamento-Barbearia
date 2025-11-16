import { Barbeiro, Prisma } from "@prisma/client";
import { CreateBarberDto } from "../dto/create-barber.dto";

export interface IBarberRepository {
  create(data: CreateBarberDto, companyId: number): Promise<Barbeiro>;
  findByEmail(cpf: string, companyId: number): Promise<Barbeiro | null>;
  updateBarber(id: number, data: Prisma.BarbeiroUpdateInput): Promise<Barbeiro>;
  findById(id: number): Promise<Barbeiro | null>;
}
