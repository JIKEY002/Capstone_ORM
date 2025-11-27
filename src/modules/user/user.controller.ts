import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    UploadedFile,
    UseGuards,
    Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import * as express from 'express';

import { CreatePostDto } from './dto/createPost.dto';

import { UserService } from './user.service';

import { createPostMulterOptions } from 'src/common/multer/createPost.multer';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard('protect'))
    @Post('createPost')
    @UseInterceptors(FileInterceptor('file', createPostMulterOptions))
    createPost(
        @UploadedFile() file: Express.Multer.File,
        @Body()
        createPostDto: CreatePostDto,
        @Request() req: express.Request,
    ) {
        return this.userService.createPost(file, createPostDto, req);
    }
}
