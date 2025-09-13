import { Controller, Post, Body, Get } from "@nestjs/common";
import { CreateEmpresaDto } from "./dto/create-empresa.dto";
import { CreateEmpresaUseCase } from "./create-empresa.usecase";
import { ListarTodasEmpresasUseCase } from "./listar-todas-empresas.usecase";

@Controller("empresa")
export class EmpresaController {
  constructor(
    private readonly createEmpresaUseCase: CreateEmpresaUseCase,
    private readonly listarTodasEmpresasUseCase: ListarTodasEmpresasUseCase
  ) {}

  @Post()
  create(@Body() data: CreateEmpresaDto) {
    return this.createEmpresaUseCase.execute(data);
  }

  @Get()
  findAll() {
    return this.listarTodasEmpresasUseCase.execute();
  }
}
