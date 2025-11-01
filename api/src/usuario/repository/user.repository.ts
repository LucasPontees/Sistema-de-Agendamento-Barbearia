import { CreateUsuarioDto } from "../dto/create-usuario.dto";
import { User } from "../entities/user.entity";
export interface IUserRepository {
  create(data: CreateUsuarioDto, empresaId: number): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findUserById(id: number): Promise<User | null>;
}
