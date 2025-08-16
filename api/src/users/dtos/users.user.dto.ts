import { IsNotEmpty } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
export class LoginUserDto {
  @ApiProperty({
    description: "The login of the user",
    example: "john.doe",
  })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: "The password of the user",
    example: "password",
  })
  @IsNotEmpty()
  readonly senha: string;
}
export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "The name of the user",
    example: "John",
  })
  nome: string;
  @IsNotEmpty()
  @ApiProperty({
    description: "The surname of the user",
    example: "Doe",
  })
  email: string;
  @IsNotEmpty()
  @ApiProperty({
    description: "The login of the user",
    example: "john.doe",
  })
  telefone: string;

  @ApiProperty({
    description: "The password of the user",
    example: "password",
  })
  @IsNotEmpty()
  senha: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "Data de Nascimento do Usuario",
    example: "12/12/2000",
  })
  dataNascimento: Date;
  @IsNotEmpty()
  @ApiProperty({
    description: "The role of the user",
    example: "CLIENT",
  })
  fotoPerfil: string;
}
