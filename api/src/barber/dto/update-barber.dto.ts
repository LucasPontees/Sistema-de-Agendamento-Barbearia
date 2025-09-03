import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsEmail,
  IsInt,
  IsNumber,
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
  foto: string;
}

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
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEspecialidadeDto)
  @ApiProperty({
    description: "Lista de especialidades do barbeiro",
    type: [CreateEspecialidadeDto],
    required: false,
  })
  especialidade?: CreateEspecialidadeDto[];

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "Foto do barbeiro", example: "image.url" })
  @MinLength(3)
  fotoPerfil: string;

  @ApiProperty({ description: "ID da empresa", example: "1" })
  @IsInt()
  empresaId: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  especialidadesIdsParaRemover?: number[];
}
