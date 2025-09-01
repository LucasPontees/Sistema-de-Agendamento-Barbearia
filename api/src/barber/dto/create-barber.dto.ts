import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateBarberDto {
  @IsString()
  @ApiProperty({ description: "Nome do barbeiro", example: "Joaquim" })
  @MinLength(3)
  nome: string;

  @IsString()
  @ApiProperty({ description: "Telefone do barbeiro", example: "11999999999" })
  @MinLength(3)
  telefone: string;

  @IsString()
  @ApiProperty({
    description: "Email do barbeiro",
    example: "joaquim@gmail.com",
  })
  @MinLength(3)
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty({ description: "Especialidade", example: "Degrade" })
  @MinLength(3)
  especialidade: string;

  @IsString()
  @ApiProperty({ description: "Foto do barbeiro", example: "image.url" })
  @MinLength(3)
  fotoPerfil: string;

  @ApiProperty({ description: "ID da empresa", example: "1" })
  empresaId: number;
}
