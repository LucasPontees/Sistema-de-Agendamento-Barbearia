import { CreateUsuarioDto } from "../dto/create-usuario.dto";
import { User } from "../entities/user.entity";
import { Usuario } from "@prisma/client";
export interface IUserRepository {
  create(data: CreateUsuarioDto): Promise<User>;
  findByEmail(email: string): Promise<Usuario | null>;
  findUserById(id: number): Promise<Usuario | null>;
}
