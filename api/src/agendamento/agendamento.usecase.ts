import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { TYPES } from "../types";
import { Agendamento } from "@prisma/client";
import { IAgendamentoRepository } from "./repository/agendamento.repository";
import { IBarberRepository } from "../barber/repository/barber.repository";
import { IServicoBarbeariaRepository } from "@/servico-barbearia/repository/servico-barbearia.repository";
import { IEmpresaRepository } from "@/empresa/repository/empresa.repository";
import { IUserRepository } from "@/usuario/repository/user.repository";

export interface CreateAgendamentoRequest {
  dataHora: string;
  usuarioId: number;
  empresaId: number;
  barbeiroId?: number;
  servicoId: number;
  observacoes?: string;
}

@Injectable()
export class CreateAgendamentoUsecase {
  constructor(
    @Inject(TYPES.AgendamentoRepository)
    private readonly iAgendamentoRepository: IAgendamentoRepository,
    @Inject(TYPES.BarberRepository)
    private readonly iBarberRepository: IBarberRepository,
    @Inject(TYPES.ServicoBarbeariaRepository)
    private readonly iServicoBarbeariaRepository: IServicoBarbeariaRepository,
    @Inject(TYPES.EmpresaRepository)
    private readonly iEmpresaRepository: IEmpresaRepository,
    @Inject(TYPES.UserRepository)
    private readonly iUserRepository: IUserRepository
  ) {}
  async create(request: CreateAgendamentoRequest): Promise<Agendamento> {
    const barberExists = request.barbeiroId
      ? await this.iBarberRepository.findById(request.barbeiroId)
      : null;

    if (!barberExists && request.barbeiroId) {
      throw new ConflictException(
        `Barber with ID ${request.barbeiroId} not found`
      );
    }

    const servicoExists = await this.iServicoBarbeariaRepository.findById(
      request.empresaId,
      request.servicoId
    );

    if (!servicoExists) {
      throw new ConflictException(
        `Service with ID ${request.servicoId} not found`
      );
    }

    const empresaExists = await this.iEmpresaRepository.findById(
      request.empresaId
    );

    if (!empresaExists) {
      throw new ConflictException(
        `Company with ID ${request.empresaId} not found`
      );
    }

    const userExists = await this.iUserRepository.findById(request.usuarioId);

    if (!userExists) {
      throw new ConflictException(
        `User with ID ${request.usuarioId} not found`
      );
    }

    return this.iAgendamentoRepository.create({
      dataHora: new Date(request.dataHora),
      usuario: { connect: { id: request.usuarioId } },
      empresa: { connect: { id: request.empresaId } },
      barbeiro: request.barbeiroId
        ? { connect: { id: request.barbeiroId } }
        : undefined,
      servico: { connect: { id: request.servicoId } },
      observacoes: request.observacoes,
    });
  }
}
