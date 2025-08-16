import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto, LoginUserDto } from "@/users/dtos/users.user.dto";
import { compare, hash } from "bcrypt";
import { PrismaService } from "../../../prisma/prisma.service";
import { Usuario } from "@prisma/client";

interface FormatLogin extends Partial<Usuario> {
  email: string | null;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: CreateUserDto): Promise<any> {
    // // check if the user exists in the db
    const userInDb = await this.prisma.usuario.findFirst({
      where: { email: userDto.email },
    });
    if (userInDb) {
      throw new HttpException("user_already_exist", HttpStatus.CONFLICT);
    }
    return await this.prisma.usuario.create({
      data: {
        ...userDto,
        senha: await hash(userDto.senha, 10),
      },
    });
  }
  //use by auth module to login user
  async findByLogin({ email }: LoginUserDto): Promise<FormatLogin> {
    const usuario = await this.prisma.usuario.findFirst({
      where: { email },
    });

    if (!usuario) {
      throw new HttpException("invalid_credentials", HttpStatus.UNAUTHORIZED);
    }

    const { senha: p, ...rest } = usuario;

    return rest;
  }

  //use by auth module to get user in database
  async findByPayload({ email }: any): Promise<any> {
    return await this.prisma.usuario.findFirst({
      where: { email },
    });
  }
}
