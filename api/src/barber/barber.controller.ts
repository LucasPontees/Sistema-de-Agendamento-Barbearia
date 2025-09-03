import { Controller, Post, Body, Patch, Param } from "@nestjs/common";
import { CreateBarberUseCase } from "./create-barber.usecase";
import { UpdateBarberUseCase } from "./update-barber.usecase";
import { CreateBarberDto } from "./dto/create-barber.dto";
import { UpdateBarberDto } from "./dto/update-barber.dto";

@Controller("barbers")
export class BarberController {
  constructor(
    private readonly createBarberUseCase: CreateBarberUseCase,
    private readonly updateBarberUseCase: UpdateBarberUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateBarberDto) {
    return this.createBarberUseCase.execute(dto);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() dto: UpdateBarberDto) {
    return this.updateBarberUseCase.execute(dto, id);
  }
}
