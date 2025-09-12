import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class UpdateBarberDto {
  @IsString()
  @ApiProperty({ description: "Nome do barbeiro", example: "Joaquim" })
  @MinLength(3)
  @IsOptional()
  nome: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: "Telefone do barbeiro", example: "11999999999" })
  @MinLength(3)
  telefone: string;

  @IsString()
  @ApiProperty({
    description: "Email do barbeiro",
    example: "joaquim@gmail.com",
  })
  @IsOptional()
  @MinLength(3)
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "Foto do barbeiro", example: "image.url" })
  @MinLength(3)
  fotoPerfil: string;

  @ApiProperty({ description: "ID da empresa", example: "1" })
  @IsInt()
  empresaId: number;
}
