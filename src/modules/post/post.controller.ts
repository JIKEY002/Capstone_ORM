import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    Request,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiTags,
    ApiOperation,
    ApiBearerAuth,
    ApiConsumes,
    ApiBody,
    ApiParam,
} from '@nestjs/swagger';
import * as express from 'express';

import { createPostMulterOptions } from 'src/common/multer/createPost.multer';

import { PostService } from './post.service';
import { QueryDto } from './dto/query.dto';
import { InfoDto } from './dto/info.dto';
import { GetCommentDto } from './dto/getComment.dto';
import { SaveDto } from './dto/save.dto';
import { CommentDto } from './dto/comment.dto';
import { GetSaveDto } from './dto/getSave.dto';
import { CreateDto } from './dto/create.dto';
import { DeleteDto } from './dto/delete.dto';

@ApiTags('Posts')
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    @ApiOperation({
        summary: 'Get all posts',
        description:
            'Retrieve paginated list of posts with optional filters (supports sorting, filtering by status)',
    })
    findAll(@Query() queryDto: QueryDto): Promise<any> {
        return this.postService.findAll(queryDto);
    }

    @UseGuards(AuthGuard('protect'))
    @Post('create')
    @ApiBearerAuth('access-token')
    @ApiOperation({
        summary: 'Create new post',
        description: 'Create a new post with file upload (image/video)',
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            required: ['title', 'file'],
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                    description:
                        'Image or video file (max 5MB for images, 100MB for videos)',
                },
                title: { type: 'string', example: 'Sample Title' },
                href: { type: 'string', example: 'https://example.com' },
                desc: {
                    type: 'string',
                    example: 'This is a sample description.',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file', createPostMulterOptions))
    create(
        @UploadedFile() file: Express.Multer.File,
        @Body()
        createDto: CreateDto,
        @Request() req: express.Request,
    ) {
        return this.postService.create(file, createDto, req);
    }

    @UseGuards(AuthGuard('protect'))
    @Post('delete/:id')
    @ApiBearerAuth('access-token')
    @ApiOperation({
        summary: 'Delete post',
        description: 'Delete a post by ID (only post owner can delete)',
    })
    @ApiParam({
        name: 'id',
        type: 'number',
        description: 'Post ID',
        example: 1,
    })
    delete(
        @Param() deleteDto: DeleteDto,
        @Request() req: express.Request,
    ): Promise<any> {
        return this.postService.delete(deleteDto, req);
    }

    @Get('info/:id')
    @ApiOperation({
        summary: 'Get post details',
        description: 'Retrieve detailed information about a specific post',
    })
    @ApiParam({
        name: 'id',
        type: 'number',
        description: 'Post ID',
        example: 1,
    })
    info(@Param() infoDto: InfoDto): Promise<any> {
        return this.postService.info(infoDto);
    }

    @Get('comments/:id')
    @ApiOperation({
        summary: 'Get post comments',
        description: 'Retrieve all comments for a specific post',
    })
    @ApiParam({
        name: 'id',
        type: 'number',
        description: 'Post ID',
        example: 1,
    })
    getComment(@Param() getCommentDto: GetCommentDto): Promise<any> {
        return this.postService.getComment(getCommentDto);
    }

    @UseGuards(AuthGuard('protect'))
    @Post('comment')
    @ApiBearerAuth('access-token')
    @ApiOperation({
        summary: 'Add comment',
        description: 'Add a comment to a post',
    })
    @ApiBody({ type: CommentDto })
    comment(
        @Request() req: express.Request,
        @Body() commentDto: CommentDto,
    ): Promise<any> {
        return this.postService.comment(commentDto, req);
    }

    @UseGuards(AuthGuard('protect'))
    @Get('save/:id')
    @ApiBearerAuth('access-token')
    @ApiOperation({
        summary: 'Check if post is saved',
        description: 'Check if a post is saved by current user',
    })
    @ApiParam({
        name: 'id',
        type: 'number',
        description: 'Post ID',
        example: 1,
    })
    getSave(
        @Param() getSaveDto: GetSaveDto,
        @Request() req: express.Request,
    ): Promise<any> {
        return this.postService.getSave(getSaveDto, req);
    }

    @UseGuards(AuthGuard('protect'))
    @Post('save')
    @ApiBearerAuth('access-token')
    @ApiOperation({
        summary: 'Save/unsave post',
        description: 'Toggle save status for a post',
    })
    @ApiBody({ type: SaveDto })
    save(
        @Body() saveDto: SaveDto,
        @Request() req: express.Request,
    ): Promise<any> {
        return this.postService.save(saveDto, req);
    }
}
