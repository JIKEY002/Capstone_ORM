import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import * as express from 'express';

import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { buildQuery } from 'src/common/helper/build-query.helper';

import { QueryDto } from './dto/query.dto';
import { InfoDto } from './dto/info.dto';
import { GetCommentDto } from './dto/getComment.dto';
import { SaveDto } from './dto/save.dto';
import { CommentDto } from './dto/comment.dto';
import { GetSaveDto } from './dto/getSave.dto';
import { CreateDto } from './dto/create.dto';
import { DeleteDto } from './dto/delete.dto';

@Injectable()
export class PostService {
    constructor(private readonly prismaService: PrismaService) {}
    async findAll(queryDto: QueryDto): Promise<any> {
        const { page, pageSize, filters, index } = buildQuery(queryDto);

        const postsPromise = this.prismaService.posts.findMany({
            where: {
                isDeleted: false,
                ...filters,
            },
            skip: index,
            take: pageSize,
            omit: {
                deletedBy: true,
                deletedAt: true,
                isDeleted: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        const countPromise = this.prismaService.posts.count({
            where: filters,
        });

        const [posts, totalItems] = await Promise.all([
            postsPromise,
            countPromise,
        ]);

        const totalPages = Math.ceil(totalItems / pageSize);

        return {
            page,
            pageSize,
            totalItems,
            totalPages,
            items: posts,
        };
    }

    async create(
        file: Express.Multer.File,
        createDto: CreateDto,
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
                title: createDto.title,
                href: createDto.href,
                fileName: file.filename,
                fileType: file['fileType'],
                desc: createDto.desc,
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

    async delete(deleteDto: DeleteDto, req: express.Request): Promise<any> {
        if (!req.user) {
            throw new UnauthorizedException('User not authenticated');
        }
        const postExists = await this.prismaService.posts.findUnique({
            where: {
                id: deleteDto.id,
                isDeleted: false,
            },
        });

        if (!postExists) {
            throw new BadRequestException('Post does not exist');
        }

        const deletedPost = await this.prismaService.posts.update({
            where: {
                id: deleteDto.id,
            },
            data: {
                isDeleted: true,
                deletedBy: req.user['id'],
                deletedAt: new Date(),
            },
        });

        return deletedPost;
    }

    async info(infoDto: InfoDto): Promise<any> {
        const post = await this.prismaService.posts.findFirst({
            where: {
                id: infoDto.id,
                isDeleted: false,
            },
            include: {
                Users: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        avatar: true,
                        age: true,
                    },
                },
            },
            omit: {
                deletedBy: true,
                deletedAt: true,
                isDeleted: true,
            },
        });

        return post;
    }

    async getComment(getCommentDto: GetCommentDto): Promise<any> {
        const comments = await this.prismaService.comments.findMany({
            where: {
                postId: getCommentDto.id,
                isDeleted: false,
            },
            orderBy: { createdAt: 'desc' },
            include: {
                Users: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        avatar: true,
                        age: true,
                    },
                },
            },
            omit: {
                deletedBy: true,
                deletedAt: true,
                isDeleted: true,
            },
        });

        return comments;
    }

    async comment(commentDto: CommentDto, req: express.Request): Promise<any> {
        if (!req.user) {
            throw new Error('User not authenticated');
        }

        const postExists = await this.prismaService.posts.findFirst({
            where: {
                id: commentDto.postId,
                isDeleted: false,
            },
        });

        if (!postExists) {
            throw new Error('Post does not exist');
        }

        const newComment = await this.prismaService.comments.create({
            data: {
                userId: req.user['id'],
                postId: postExists.id,
                content: commentDto.content,
            },
            omit: {
                deletedBy: true,
                deletedAt: true,
                isDeleted: true,
            },
        });

        return newComment;
    }

    async getSave(getSaveDto: GetSaveDto, req: express.Request): Promise<any> {
        if (!req.user) {
            throw new Error('User not authenticated');
        }

        const postExists = await this.prismaService.posts.findFirst({
            where: {
                id: getSaveDto.id,
                isDeleted: false,
            },
        });

        if (!postExists) {
            throw new Error('Post does not exist');
        }

        const alreadySaved = await this.prismaService.savePosts.findFirst({
            where: {
                postId: getSaveDto.id,
                userId: req.user['id'],
                isDeleted: false,
            },
        });

        return alreadySaved;
    }

    async save(saveDto: SaveDto, req: express.Request): Promise<any> {
        if (!req.user) {
            throw new Error('User not authenticated');
        }
        const postExists = await this.prismaService.posts.findUnique({
            where: {
                id: saveDto.postId,
                isDeleted: false,
            },
        });

        if (!postExists) {
            throw new Error('Post does not exist');
        }

        const alreadySaved = await this.prismaService.savePosts.findFirst({
            where: {
                postId: saveDto.postId,
                userId: req.user['id'],
                isDeleted: false,
            },
        });

        if (alreadySaved) {
            const updatedSave = await this.prismaService.savePosts.update({
                where: {
                    id: alreadySaved.id,
                },
                data: {
                    isDeleted: true,
                    deletedBy: req.user['id'],
                    deletedAt: new Date(),
                },
            });
            return updatedSave;
        }

        const newSave = await this.prismaService.savePosts.create({
            data: {
                userId: req.user['id'],
                postId: saveDto.postId,
            },
        });

        return newSave;
    }
}
