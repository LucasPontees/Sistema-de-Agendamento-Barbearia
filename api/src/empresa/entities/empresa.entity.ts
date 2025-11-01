export class Empresa {
  constructor(
    public readonly id: number,
    public readonly nomeFantasia: string,
    public readonly cnpj: string,
    public readonly telefone: string,
    public readonly email: string,
    public readonly endereco: string,
    public readonly descricao: string | null,
    public readonly logo?: string | null,
    public readonly usarios?: any[]
  ) {}
}
