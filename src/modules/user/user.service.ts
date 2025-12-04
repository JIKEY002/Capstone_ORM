import {
    Injectable,
    UnauthorizedException,
    BadRequestException,
} from '@nestjs/common';
import * as express from 'express';

import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { UpdateInfoDto } from './dto/updateInfo.dto';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}
    async info(req: express.Request): Promise<any> {
        if (!req.user) {
            throw new UnauthorizedException('User not authenticated');
        }

        const user = await this.prismaService.users.findUnique({
            where: { id: req.user['id'] },
            omit: {
                password: true,
                deletedBy: true,
                deletedAt: true,
                isDeleted: true,
            },
        });

        return user;
    }

    async postSave(req: express.Request): Promise<any> {
        if (!req.user) {
            throw new UnauthorizedException('User not authenticated');
        }
        const saves = await this.prismaService.savePosts.findMany({
            where: { userId: req.user['id'], isDeleted: false },
            include: {
                Posts: true,
            },
        });

        return saves;
    }

    async postList(req: express.Request): Promise<any> {
        if (!req.user) {
            throw new UnauthorizedException('User not authenticated');
        }

        const posts = await this.prismaService.posts.findMany({
            where: { userId: req.user['id'], isDeleted: false },
            orderBy: { createdAt: 'desc' },
            omit: {
                deletedBy: true,
                deletedAt: true,
                isDeleted: true,
            },
        });

        return posts;
    }

    async updateInfo(
        updateInfoDto: UpdateInfoDto,
        req: express.Request,
    ): Promise<any> {
        if (!req.user) {
            throw new UnauthorizedException('User not authenticated');
        }

        const userExists = await this.prismaService.users.findUnique({
            where: { id: req.user['id'], isDeleted: false },
        });

        if (userExists && userExists.id !== req.user['id']) {
            throw new BadRequestException('Email already in use');
        }

        const fullName = `${updateInfoDto.fistname} ${updateInfoDto.name}`;

        const updatedUser = await this.prismaService.users.update({
            where: { id: req.user['id'], isDeleted: false },
            data: {
                fullName: fullName,
                avatar: updateInfoDto.avatar,
                fistname: updateInfoDto.fistname,
                name: updateInfoDto.name,
                introduce: updateInfoDto.introduce,
                website: updateInfoDto.website,
                username: updateInfoDto.username,
            },
            omit: {
                password: true,
                deletedBy: true,
                deletedAt: true,
                isDeleted: true,
            },
        });

        return updatedUser;
    }
}
