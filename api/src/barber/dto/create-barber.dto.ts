import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from "class-validator";

class CreateEspecialidadeDto {
  @IsString()
  @ApiProperty({ description: "Nome da especialidade", example: "Degradê" })
  nome: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "Descrição da especialidade",
    example: "Corte com efeito degradê",
    required: false,
  })
  descricao: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "Foto ilustrativa",
    example: "image.url",
    required: false,
  })
  foto?: string;
}

export class CreateBarberDto {
  @IsString()
  @ApiProperty({ description: "Nome do barbeiro", example: "johndoe" })
  @MinLength(3)
  nome: string;

  @IsString()
  @ApiProperty({ description: "Telefone do barbeiro", example: "11999999999" })
  @MinLength(3)
  telefone: string;

  @IsString()
  @ApiProperty({
    description: "Email do barbeiro",
    example: "johndoe@gmail.com",
  })
  @MinLength(3)
  @IsEmail()
  email: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEspecialidadeDto)
  @ApiProperty({
    description: "Lista de especialidades do barbeiro",
    type: [CreateEspecialidadeDto],
    required: false,
  })
  especialidade?: CreateEspecialidadeDto[];

  @IsString()
  @ApiProperty({ description: "Foto do barbeiro", example: "image.url" })
  @MinLength(3)
  fotoPerfil: string;

  @ApiProperty({ description: "ID da empresa", example: "1" })
  @IsInt()
  empresaId: number;
}
