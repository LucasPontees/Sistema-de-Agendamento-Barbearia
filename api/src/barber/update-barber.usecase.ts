import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { Barbeiro } from "@prisma/client";
import { TYPES } from "../types";
import { IBarberRepository } from "./repository/barber.repository";
import { CreateBarberRequest } from "./create-barber.usecase";

export interface UpdateBarberRequest extends CreateBarberRequest {}

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

    return this.iBarberRepository.updateBarber(id, {
      nome: request.nome,
      telefone: request.telefone,
      email: request.email,
      especialidade: {
        create: request.especialidade,
      },
    });
  }
}
