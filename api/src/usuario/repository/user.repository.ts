import { Prisma, Usuario } from "@prisma/client";

export abstract class IUserRepository {
  abstract create(data: Prisma.UsuarioCreateInput): Promise<Usuario>;
  abstract findByEmail(email: string): Promise<Usuario | null>;
}
