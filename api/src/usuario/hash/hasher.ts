export interface IHasher {
  hash(senha: string): Promise<string>;
}
