import {
    Injectable,
    UnauthorizedException,
    BadRequestException,
} from '@nestjs/common';
import * as express from 'express';

import { CreatePostDto } from './dto/createPost.dto';

import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}
    async createPost(
        file: Express.Multer.File,
        createPostDto: CreatePostDto,
        req: express.Request,
    ): Promise<any> {
        if (!req.user) {
            throw new UnauthorizedException('User not authenticated');
        }

        if (!file) {
            throw new BadRequestException('File upload failed');
        }

        const newPost = await this.prismaService.posts.create({
            data: {
                title: createPostDto.title,
                href: createPostDto.href,
                fileName: file.filename,
                fileType: file['fileType'],
                desc: createPostDto.desc,
                userId: req.user['id'],
            },
            omit: {
                deletedBy: true,
                deletedAt: true,
                isDeleted: true,
            },
        });

        return newPost;
    }
}
