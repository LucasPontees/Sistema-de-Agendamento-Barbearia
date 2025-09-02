import { PartialType } from "@nestjs/swagger";
import { CreateServicoBarbeariaDto } from "./create-servico-barbearia.dto";

export class UpdateServicoBarbeariaDto extends PartialType(
  CreateServicoBarbeariaDto,
) {}
