import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { ACCESS_TOKENN_SECRET } from 'src/common/constant/app.constant';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class ProtectStrategy extends PassportStrategy(Strategy, 'protect') {
    constructor(private readonly prismaService: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: ACCESS_TOKENN_SECRET,
        });
    }

    async validate(payload: any) {
        const userExists = await this.prismaService.users.findUnique({
            where: { id: payload.userId },
            omit: { password: true },
        });

        if (!userExists) {
            return null;
        }

        return userExists;
    }
}
