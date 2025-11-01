import { CreateEmpresaDto } from "../dto/create-empresa.dto";
import { Empresa } from "../entities/empresa.entity";

export interface IEmpresaRepository {
  create(data: Omit<CreateEmpresaDto, "usuario">): Promise<Empresa>;
  findByCnpj(cnpj: string): Promise<Empresa | null>;
  findById(id: number): Promise<Empresa | null>;
  findAll(): Promise<Empresa[]>;
}
