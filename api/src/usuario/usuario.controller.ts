import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "./create-user.usecase";
import { CreateUsuarioDto } from "@/usuario/dto/create-usuario.dto";
@Controller("usuario")
export class UsuarioController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post("create")
  async create(@Body() data: CreateUsuarioDto) {
    return this.createUserUseCase.execute(data);
  }
}
