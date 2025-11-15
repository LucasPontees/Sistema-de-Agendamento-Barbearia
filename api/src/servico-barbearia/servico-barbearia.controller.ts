import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ServicoBarbeariaUseCase } from "./servico-barbearia.usecase";
import { CreateServicoBarbeariaDto } from "./dto/create-servico-barbearia.dto";
import { ListarServicoIdUseCase } from "./listar-servico-id-company.usecase";
import { JwtPayload } from "@/login/strategies/jwt-strategy";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "@/login/strategies/roles.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "@/login/strategies/roles.decorator";
import { UserRole } from "@/usuario/enum/role";

interface RequestWithUser extends Request {
  user: JwtPayload;
}

@Controller("servico-barbearia")
export class ServicoBarbeariaController {
  constructor(
    private readonly servicoBarbeariaUseCase: ServicoBarbeariaUseCase,
    private readonly listarServicoIdUseCase: ListarServicoIdUseCase
  ) {}

  @Post()
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @ApiBearerAuth("JWT-auth")
  @Roles(UserRole.EMPRESA)
  create(@Req() req: RequestWithUser, @Body() dto: CreateServicoBarbeariaDto) {
    const empresaId = req.user.empresaId;
    return this.servicoBarbeariaUseCase.execute(dto, empresaId);
  }

  @Get()
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @ApiBearerAuth("JWT-auth")
  @Roles(UserRole.USUARIO)
  findOne(@Req() req: RequestWithUser) {
    const empresaID = req.user.empresaId;
    return this.listarServicoIdUseCase.execute(empresaID);
  }
}
