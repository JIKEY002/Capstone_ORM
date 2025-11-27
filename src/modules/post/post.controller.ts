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

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    findAll(@Query() queryDto: QueryDto): Promise<any> {
        return this.postService.findAll(queryDto);
    }

    @UseGuards(AuthGuard('protect'))
    @Post('create')
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
    delete(
        @Param() deleteDto: DeleteDto,
        @Request() req: express.Request,
    ): Promise<any> {
        return this.postService.delete(deleteDto, req);
    }

    @Get('info/:id')
    info(@Param() infoDto: InfoDto): Promise<any> {
        return this.postService.info(infoDto);
    }

    @Get('comments/:id')
    getComment(@Param() getCommentDto: GetCommentDto): Promise<any> {
        return this.postService.getComment(getCommentDto);
    }

    @UseGuards(AuthGuard('protect'))
    @Post('comment')
    comment(
        @Request() req: express.Request,
        @Body() commentDto: CommentDto,
    ): Promise<any> {
        return this.postService.comment(commentDto, req);
    }

    @UseGuards(AuthGuard('protect'))
    @Get('save/:id')
    getSave(
        @Param() getSaveDto: GetSaveDto,
        @Request() req: express.Request,
    ): Promise<any> {
        return this.postService.getSave(getSaveDto, req);
    }

    @UseGuards(AuthGuard('protect'))
    @Post('save')
    save(
        @Body() saveDto: SaveDto,
        @Request() req: express.Request,
    ): Promise<any> {
        return this.postService.save(saveDto, req);
    }
}
