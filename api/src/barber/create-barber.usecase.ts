import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { Barbeiro } from "@prisma/client";
import { TYPES } from "../types";
import { IBarberRepository } from "./repository/barber.repository";
import { IEmpresaRepository } from "@/empresa/repository/empresa.repository";

export interface CreateBarberRequest {
  nome: string;
  telefone: string;
  email: string;
  fotoPerfil: string;
  empresaId: number;
}

@Injectable()
export class CreateBarberUseCase {
  constructor(
    @Inject(TYPES.BarberRepository)
    private readonly iBarberRepository: IBarberRepository,
    @Inject(TYPES.EmpresaRepository)
    private readonly iEmpresaRepository: IEmpresaRepository,
  ) {}
  async execute(request: CreateBarberRequest): Promise<Barbeiro> {
    const { email, empresaId } = request;
    const barberExists = await this.iBarberRepository.findByEmail(
      email,
      empresaId,
    );

    if (barberExists) {
      throw new ConflictException(`Barber already exists with email ${email}`);
    }

    const comapanyExists = await this.iEmpresaRepository.findById(empresaId);

    if (!comapanyExists) {
      throw new ConflictException(`Empresa with ID ${empresaId} not found`);
    }

    return this.iBarberRepository.create({
      nome: request.nome,
      telefone: request.telefone,
      email: request.email.toLowerCase(),
      fotoPerfil: request.fotoPerfil,
      empresa: { connect: { id: request.empresaId } },
    });
  }
}
