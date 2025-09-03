import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { Barbeiro } from "@prisma/client";
import { TYPES } from "../types";
import { IBarberRepository } from "./repository/barber.repository";
import { IEmpresaRepository } from "@/empresa/repository/empresa.repository";

export interface UpdateBarberRequest {
  nome?: string;
  telefone?: string;
  email?: string;
  especialidade?: string;
  empresaId;
}

@Injectable()
export class UpdateBarberUseCase {
  constructor(
    @Inject(TYPES.BarberRepository)
    private readonly iBarberRepository: IBarberRepository
  ) {}

  async execute(request: UpdateBarberRequest, id: number): Promise<Barbeiro> {
    const { email, empresaId } = request;

    if (email) {
      const barberExists = await this.iBarberRepository.findByEmail(
        email,
        empresaId
      );

      if (barberExists && barberExists.id !== id) {
        throw new ConflictException(
          `Barber already exists with email ${email}`
        );
      }
    }

    return this.iBarberRepository.updateBarber(id, request);
  }
}
