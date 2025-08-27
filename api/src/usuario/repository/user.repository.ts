export interface UserResponse {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  dataNascimento?: Date | null;
  fotoPerfil?: string | null;
}

export interface IUserRepository {
  create(data: {
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    dataNascimento: string;
    fotoPerfil: string;
  }): Promise<UserResponse>;
}
