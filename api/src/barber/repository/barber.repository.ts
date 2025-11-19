import { Barbeiro, Prisma } from "@prisma/client";
import { CreateBarberDto } from "../dto/create-barber.dto";

export abstract class IBarberRepository {
  abstract create(data: CreateBarberDto, companyId: number): Promise<Barbeiro>;
  abstract findByEmail(cpf: string, companyId: number): Promise<Barbeiro | null>;
  abstract updateBarber(id: number, data: Prisma.BarbeiroUpdateInput): Promise<Barbeiro>;
  abstract findById(id: number): Promise<Barbeiro | null>;
  abstract returnBarbeirosPorEmpresa(empresaId: number): Promise<Barbeiro[]>;
}
