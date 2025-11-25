import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/modules-system/prisma/prisma.service';

import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async register(registerAuthDto: RegisterAuthDto): Promise<any> {
    const userExists = await this.prismaService.users.findUnique({
      where: { email: registerAuthDto.email },
    });

    if (userExists) {
      throw new UnauthorizedException('Email already in use');
    }

    const hashedPassword = bcrypt.hashSync(registerAuthDto.password, 10);

    const newUser = await this.prismaService.users.create({
      data: {
        fullName: registerAuthDto.fullName,
        email: registerAuthDto.email,
        password: hashedPassword,
      },
      omit: {
        password: true,
      },
    });

    return newUser;
  }
}
