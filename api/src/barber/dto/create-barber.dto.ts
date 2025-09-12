import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsString, MinLength } from "class-validator";

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

  @IsString()
  @ApiProperty({ description: "Foto do barbeiro", example: "image.url" })
  @MinLength(3)
  fotoPerfil: string;

  @ApiProperty({ description: "ID da empresa", example: "1" })
  @IsInt()
  empresaId: number;
}
