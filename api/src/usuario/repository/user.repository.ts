import { Prisma, Usuario } from "@prisma/client";

export interface IUserRepository {
  create(data: Prisma.UsuarioCreateInput): Promise<Usuario>;
  findByEmail(email: string): Promise<Usuario | null>;
  findById(id: number): Promise<Usuario | null>;
}
