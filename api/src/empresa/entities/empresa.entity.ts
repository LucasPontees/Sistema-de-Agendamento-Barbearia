import { UserRole } from "@/usuario/enum/role";
export class Empresa {
  constructor(
    public readonly id: number,
    public readonly nomeFantasia: string,
    public readonly cnpj: string,
    public readonly telefone: string,
    public readonly email: string,
    public readonly endereco: string,
    public readonly role: UserRole,
    public readonly descricao?: string,
    public readonly logo?: string,
  ) {}
}
