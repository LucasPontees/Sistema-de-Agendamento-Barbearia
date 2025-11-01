import { Usuario } from "@prisma/client";
import { CreateUsuarioDto } from "../dto/create-usuario.dto";
export interface IUserRepository {
  create(data: CreateUsuarioDto, empresaId: number): Promise<Usuario>;
  findByEmail(email: string): Promise<Usuario | null>;
  findUserById(id: number): Promise<Usuario | null>;
}
