import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { buildQuery } from 'src/common/helper/build-query.helper';

import { QueryDto } from './dto/query.dto';

@Injectable()
export class PostService {
    constructor(private readonly prismaService: PrismaService) {}
    async findAll(queryDto: QueryDto): Promise<any> {
        const { page, pageSize, filters, index } = buildQuery(queryDto);

        const postsPromise = this.prismaService.posts.findMany({
            where: filters,
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
}
