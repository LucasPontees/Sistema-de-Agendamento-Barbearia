export interface IUserRepository {
  create(data: {
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    dataNascimento: string;
    fotoPerfil: string;
  }): Promise<any>;
}
