import { TYPES } from "@/types";
import { Inject, Injectable } from "@nestjs/common";
import { IBarberRepository } from "./repository/barber.repository";
import { Barbeiro } from "@prisma/client";

@Injectable()
export class RetornaBarbeirosEmpresaUsecase {
  constructor(
    private readonly iBarberRepository: IBarberRepository
  ) {}

  async retornaBarbeiros(empresaId: number): Promise<Barbeiro[]> {
    return this.iBarberRepository.returnBarbeirosPorEmpresa(empresaId);
  }
}
