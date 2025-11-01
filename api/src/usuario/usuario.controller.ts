import { Body, Controller, Post, UseGuards, Req } from "@nestjs/common";
import { CreateUserUseCase } from "./create-user.usecase";
import { CreateUsuarioDto } from "@/usuario/dto/create-usuario.dto";
import { AuthGuard } from "@nestjs/passport";
import { JwtPayload } from "@/login/strategies/jwt-strategy";
import { RolesGuard } from "@/login/strategies/roles.guard";
import { Roles } from "@/login/strategies/roles.decorator";
interface RequestWithUser extends Request {
  user: JwtPayload;
}
@Controller("users")
export class UsuarioController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("EMPRESA")
  async create(@Req() req: RequestWithUser, @Body() data: CreateUsuarioDto) {
    const empresaId = req.user.empresaId;
    return this.createUserUseCase.execute(data, empresaId);
  }
}
