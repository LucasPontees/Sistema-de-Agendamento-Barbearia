import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { TYPES } from "../types";
import { Agendamento } from "@prisma/client";
import { IAgendamentoRepository } from "./repository/agendamento.repository";
import { IBarberRepository } from "../barber/repository/barber.repository";
import { IServicoBarbeariaRepository } from "@/servico-barbearia/repository/servico-barbearia.repository";
import { IEmpresaRepository } from "@/empresa/repository/empresa.repository";
import { IUserRepository } from "@/usuario/repository/user.repository";
import { CreateAgendamentoDto } from "./dto/create-agendamento.dto";

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
    private readonly iUserRepository: IUserRepository,
  ) {}
  async create(
    request: CreateAgendamentoDto,
    usuarioId: number,
    empresaId: number,
  ): Promise<Agendamento> {
    const { ...rest } = request;

    const barberExists = request.barbeiroId
      ? await this.iBarberRepository.findById(request.barbeiroId)
      : null;

    if (!barberExists && request.barbeiroId) {
      throw new ConflictException(
        `Barber with ID ${request.barbeiroId} not found`,
      );
    }

    const empresaExists = await this.iEmpresaRepository.findById(empresaId);

    if (!empresaExists) {
      throw new ConflictException(`Company with ID ${empresaId} not found`);
    }

    const userExists = await this.iUserRepository.findUserById(usuarioId);

    if (!userExists) {
      throw new ConflictException(`User with ID ${usuarioId} not found`);
    }

    const agendamento = this.iAgendamentoRepository.create(
      { ...rest },
      usuarioId,
      empresaId,
    );

    return agendamento;
  }
}
