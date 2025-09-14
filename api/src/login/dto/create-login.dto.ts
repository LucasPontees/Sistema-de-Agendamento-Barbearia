// src/auth/dto/login.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
  @IsString()
  @ApiProperty({ description: "Email do usuário", example: "eul@example.com" })
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty({ description: "Senha do usuário", example: "senha123" })
  @MinLength(6)
  password: string;
}
