import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsString, MinLength } from "class-validator";

export class CreateUsuarioDto {
  @ApiProperty({
    description: "Nome do usuário",
    example: "João Silva",
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: "Email do usuário",
    example: "eul@example.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Telefone do usuário",
    example: "11999999999",
  })
  @IsString()
  telefone: string;

  @ApiProperty({
    description: "Senha do usuário",
    example: "senha123",
  })
  @MinLength(6)
  senha: string;

  @ApiProperty({
    description: "Data de nascimento do usuário",
    example: "1990-01-01",
    type: String,
  })
  @IsDate()
  @Type(() => Date)
  dataNascimento: Date;

  @ApiProperty({
    description: "URL da foto de perfil do usuário",
    example: "http://example.com/foto.jpg",
  })
  @IsString()
  fotoPerfil: string;
}
