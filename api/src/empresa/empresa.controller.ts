import { Controller, Post, Body } from "@nestjs/common";
import { CreateEmpresaDto } from "./dto/create-empresa.dto";
import { CreateEmpresaUseCase } from "./create-empresa.usecase";

@Controller("empresa")
export class EmpresaController {
  constructor(private readonly createEmpresaUseCase: CreateEmpresaUseCase) {}

  @Post()
  create(@Body() data: CreateEmpresaDto) {
    return this.createEmpresaUseCase.execute(data);
  }
}
