import { UserRole } from "../enum/role";

export class User {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly role: UserRole,
    public readonly nome: string,
    public readonly senha: string,
    public readonly telefone?: string,
    public readonly fotoPerfil?: string,
    public readonly dataNascimento?: Date,
  ) {}
}
