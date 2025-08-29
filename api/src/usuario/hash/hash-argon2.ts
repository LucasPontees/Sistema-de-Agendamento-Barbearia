import { Injectable } from "@nestjs/common";
import { IHasher } from "./hasher";
import * as argon2 from "argon2";

@Injectable()
export class HashArgon2 implements IHasher {
  async hash(senha: string): Promise<string> {
    return await argon2.hash(senha);
  }
}
