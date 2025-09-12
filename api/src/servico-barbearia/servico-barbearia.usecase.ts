import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { Servico } from "@prisma/client";
import { TYPES } from "@/types";
import { IServicoBarbeariaRepository } from "./repository/servico-barbearia.repository";
import { IEmpresaRepository } from "@/empresa/repository/empresa.repository";

interface createServicoBarbeariaRequest {
  nome: string;
  descricao: string;
  duracaoMin: number;
  preco: number;
  empresaId: number;
}

@Injectable()
export class ServicoBarbeariaUseCase {
  constructor(
    @Inject(TYPES.ServicoBarbeariaRepository)
    private readonly iServicoBarbeariaRepository: IServicoBarbeariaRepository,
    @Inject(TYPES.EmpresaRepository)
    private readonly iEmpresaRepository: IEmpresaRepository,
  ) {}
  async execute(request: createServicoBarbeariaRequest): Promise<Servico> {
    const { nome, descricao, duracaoMin, preco, empresaId } = request;

    const comapanyExists = await this.iEmpresaRepository.findById(empresaId);

    if (!comapanyExists) {
      throw new ConflictException(`Empresa with ID ${empresaId} not found`);
    }

    return this.iServicoBarbeariaRepository.create({
      nome: nome,
      descricao: descricao,
      duracaoMin: duracaoMin,
      preco: preco,
      empresa: { connect: { id: empresaId } },
    });
  }
}
