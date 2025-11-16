import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
  Get,
} from "@nestjs/common";
import { CreateBarberUseCase } from "./create-barber.usecase";
import { UpdateBarberUseCase } from "./update-barber.usecase";
import { CreateBarberDto } from "./dto/create-barber.dto";
import { UpdateBarberDto } from "./dto/update-barber.dto";
import { JwtPayload } from "@/login/strategies/jwt-strategy";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "@/login/strategies/roles.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "@/login/strategies/roles.decorator";
import { UserRole } from "@/usuario/enum/role";
import { RetornaBarbeirosEmpresaUsecase } from "./retorna-barbeiros-empresa.usecase";

interface RequestWithUser extends Request {
  user: JwtPayload;
}
@Controller("barbers")
export class BarberController {
  constructor(
    private readonly createBarberUseCase: CreateBarberUseCase,
    private readonly updateBarberUseCase: UpdateBarberUseCase,
    private readonly retornaBarbeirosEmpresaUsecase: RetornaBarbeirosEmpresaUsecase
  ) {}

  @Post()
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @ApiBearerAuth("JWT-auth")
  @Roles(UserRole.EMPRESA)
  create(@Req() req: RequestWithUser, @Body() dto: CreateBarberDto) {
    const empresaId = req.user.empresaId;
    return this.createBarberUseCase.execute(dto, empresaId);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() dto: UpdateBarberDto) {
    return this.updateBarberUseCase.execute(dto, id);
  }

  @Get()
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @ApiBearerAuth("JWT-auth")
  @Roles(UserRole.EMPRESA)
  getAll(@Req() req: RequestWithUser) {
    const empresaId = req.user.empresaId;
    return this.retornaBarbeirosEmpresaUsecase.retornaBarbeiros(empresaId);
  }
}
