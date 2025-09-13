import { Controller, Post, Body, Get, Query, Param } from "@nestjs/common";
import { ServicoBarbeariaUseCase } from "./servico-barbearia.usecase";
import { CreateServicoBarbeariaDto } from "./dto/create-servico-barbearia.dto";
import { ListarServicoIdUseCase } from "./listar_servico-id.usecase";

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

  @Get(":id")
  findOne(@Query("empresaID") empresaID: number, @Param("id") id: number) {
    return this.listarServicoIdUseCase.execute(id, empresaID);
  }
}
