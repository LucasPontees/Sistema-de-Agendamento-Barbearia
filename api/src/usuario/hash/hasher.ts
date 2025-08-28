export abstract class Hasher {
  abstract hash(senha: string): Promise<string>;
}
