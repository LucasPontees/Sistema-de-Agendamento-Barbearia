import {
  Controller,
  Post,
  Body,
  Get,
  BadRequestException,
  Param,
} from "@nestjs/common";
import { CreateEmpresaDto } from "./dto/create-empresa.dto";
import { CreateEmpresaUseCase } from "./create-empresa.usecase";
import { ListarTodasEmpresasUseCase } from "./listar-todas-empresas.usecase";
import { ListarEmpresaIdUseCase } from "./listar_empresa-id.usecase";

@Controller("empresa")
export class EmpresaController {
  constructor(
    private readonly createEmpresaUseCase: CreateEmpresaUseCase,
    private readonly listarTodasEmpresasUseCase: ListarTodasEmpresasUseCase,
    private readonly listarEmpresaIdUseCase: ListarEmpresaIdUseCase
  ) {}

  @Post()
  create(@Body() data: CreateEmpresaDto) {
    return this.createEmpresaUseCase.execute(data);
  }

  @Get()
  findAll() {
    return this.listarTodasEmpresasUseCase.execute();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.listarEmpresaIdUseCase.execute(id);
  }
}
