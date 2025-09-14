import { Controller, Post, Body, Get, Query } from "@nestjs/common";
import { ServicoBarbeariaUseCase } from "./servico-barbearia.usecase";
import { CreateServicoBarbeariaDto } from "./dto/create-servico-barbearia.dto";
import { ListarServicoIdUseCase } from "./listar-servico-id-company.usecase";

@Controller("servico-barbearia")
export class ServicoBarbeariaController {
  constructor(
    private readonly servicoBarbeariaUseCase: ServicoBarbeariaUseCase,
    private readonly listarServicoIdUseCase: ListarServicoIdUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateServicoBarbeariaDto) {
    return this.servicoBarbeariaUseCase.execute(dto);
  }

  @Get()
  findOne(@Query("empresaID") empresaID: number) {
    return this.listarServicoIdUseCase.execute(empresaID);
  }
}
