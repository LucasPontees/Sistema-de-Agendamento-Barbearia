import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateEmpresaDto {
  @IsString()
  @ApiProperty({ description: "Nome da empresa", example: "Barber Shop Zenit" })
  @MinLength(3)
  nomeFantasia: string;

  @IsString()
  @ApiProperty({
    description: "CNPJ da empresa",
    example: "00.000.000/0000-00",
  })
  @MinLength(3)
  cnpj: string;

  @IsString()
  @ApiProperty({
    description: "Telefone da empresa",
    example: "(00) 00000-0000",
  })
  @MinLength(3)
  telefone: string;

  @IsString()
  @ApiProperty({
    description: "Email da empresa",
    example: "barbarshopzenit@gmail.com",
  })
  @MinLength(3)
  email: string;

  @IsString()
  @ApiProperty({
    description: "Endereço da empresa",
    example:
      "Rua da empresa, 123, Bairro da empresa, Cidade da empresa, Estado da empresa",
  })
  @MinLength(3)
  endereco: string;

  @IsString()
  @ApiProperty({
    description: "Descricao da empresa",
    example: "Barber Shop Zenit - Sua barbearia favorita",
  })
  @MinLength(3)
  descricao: string;

  @IsString()
  @ApiProperty({ description: "Logo da empresa", example: "logo.png" })
  @MinLength(3)
  logo: string;

  @IsString()
  @ApiProperty({
    description: "Horário de funcionamento",
    example: "10:00 - 18:00",
  })
  @MinLength(3)
  horariosFuncionamento: string;
}
