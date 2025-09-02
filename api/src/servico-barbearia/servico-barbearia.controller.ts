import { Controller, Post, Body } from "@nestjs/common";
import { ServicoBarbeariaUseCase } from "./servico-barbearia.usecase";
import { CreateServicoBarbeariaDto } from "./dto/create-servico-barbearia.dto";

@Controller("servico-barbearia")
export class ServicoBarbeariaController {
  constructor(
    private readonly servicoBarbeariaUseCase: ServicoBarbeariaUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateServicoBarbeariaDto) {
    return this.servicoBarbeariaUseCase.execute(dto);
  }
}
