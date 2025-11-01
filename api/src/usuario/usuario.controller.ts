import { Body, Controller, Post, UseGuards, Req } from "@nestjs/common";
import { CreateUserUseCase } from "./create-user.usecase";
import { CreateUsuarioDto } from "@/usuario/dto/create-usuario.dto";
import { AuthGuard } from "@nestjs/passport";
import { JwtPayload } from "@/login/strategies/jwt-strategy";
interface RequestWithUser extends Request {
  user: JwtPayload;
}
@Controller("users")
export class UsuarioController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  async create(@Req() req: RequestWithUser, @Body() data: CreateUsuarioDto) {
    const empresaId = req.user.empresaId;
    console.log("Empresa ID do usuário autenticado:", empresaId);
    return this.createUserUseCase.execute(data, empresaId);
  }
}
