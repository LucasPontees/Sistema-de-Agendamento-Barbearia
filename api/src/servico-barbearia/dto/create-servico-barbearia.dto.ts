import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, MinLength } from "class-validator";

export class CreateServicoBarbeariaDto {
  @IsString()
  @ApiProperty({
    description: "Nome do Serviço",
    example: "Corte Social",
  })
  @MinLength(3)
  nome: string;

  @IsString()
  @ApiProperty({
    description: "Descrição do Serviço",
    example: "Corte Social estilo anos 90...",
  })
  @MinLength(3)
  descricao: string;

  @ApiProperty({
    description: "Duração do Serviço",
    example: "1",
  })
  @IsInt()
  duracaoMin: number;

  @ApiProperty({
    description: "Valor do Serviço",
    example: "150",
  })
  @IsInt()
  preco: number;

  @ApiProperty({
    description: "Empresa que registra o Serviço",
    example: "1",
  })
  @IsInt()
  empresaId: number;
}
