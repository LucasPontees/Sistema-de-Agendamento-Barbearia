import { Controller, Post, Body } from "@nestjs/common";
import { CreateBarberUseCase } from "./create-barber.usecase";
import { CreateBarberDto } from "./dto/create-barber.dto";

@Controller("barbers")
export class BarberController {
  constructor(private readonly createBarberUseCase: CreateBarberUseCase) {}

  @Post()
  create(@Body() dto: CreateBarberDto) {
    console.log(dto.empresaId);

    return this.createBarberUseCase.execute(dto);
  }
}
