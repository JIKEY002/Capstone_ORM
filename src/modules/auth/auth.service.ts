import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { TokenService } from 'src/modules-system/token/token.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly tokenService: TokenService,
    ) {}

    async register(registerDto: RegisterDto): Promise<any> {
        const userExists = await this.prismaService.users.findUnique({
            where: { email: registerDto.email },
        });

        if (userExists) {
            throw new UnauthorizedException('Email already in use');
        }

        const hashedPassword = bcrypt.hashSync(registerDto.password, 10);

        const fullName = `${registerDto.fistname} ${registerDto.name}`;
        const newUser = await this.prismaService.users.create({
            data: {
                fistname: registerDto.fistname,
                name: registerDto.name,
                fullName: fullName,
                email: registerDto.email,
                password: hashedPassword,
                age: registerDto.age,
            },
            omit: {
                password: true,
                deletedBy: true,
                deletedAt: true,
                isDeleted: true,
            },
        });

        return newUser;
    }

    async login(loginDto: LoginDto): Promise<any> {
        const userExists = await this.prismaService.users.findUnique({
            where: { email: loginDto.email },
        });

        if (!userExists) {
            throw new UnauthorizedException('Invalid email or password');
        }

        if (!userExists.password) {
            throw new UnauthorizedException('Please login with OAuth provider');
        }

        const isPasswordValid = bcrypt.compareSync(
            loginDto.password,
            userExists.password,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const accessToken = this.tokenService.generateToken({
            userId: userExists.id,
        });

        return accessToken;
    }
}
