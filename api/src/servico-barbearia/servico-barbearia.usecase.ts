import { Inject, Injectable } from "@nestjs/common";
import { Servico } from "@prisma/client";
import { TYPES } from "@/types";
import { IServicoBarbeariaRepository } from "./repository/servico-barbearia.repository";

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
  ) {}
  execute(request: createServicoBarbeariaRequest): Promise<Servico> {
    const { nome, descricao, duracaoMin, preco, empresaId } = request;

    return this.iServicoBarbeariaRepository.create({
      nome: nome,
      descricao: descricao,
      duracaoMin: duracaoMin,
      preco: preco,
      empresa: { connect: { id: empresaId } },
    });
  }
}
