import { Servico } from "@prisma/client";
import { CreateServicoBarbeariaDto } from "../dto/create-servico-barbearia.dto";

export interface IServicoBarbeariaRepository {
  create(data: CreateServicoBarbeariaDto, empresaId: number): Promise<Servico>;
  findServicoByIdCompany(empresaId: number): Promise<Servico[] | null>;
}
