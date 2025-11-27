import { Controller, UseGuards, Request, Get, Put, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as express from 'express';

import { UserService } from './user.service';
import { UpdateInfoDto } from './dto/updateInfo.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard('protect'))
    @Get('info')
    info(@Request() req: express.Request) {
        return this.userService.info(req);
    }

    @UseGuards(AuthGuard('protect'))
    @Get('posts-save')
    postSave(@Request() req: express.Request) {
        return this.userService.postSave(req);
    }

    @UseGuards(AuthGuard('protect'))
    @Get('posts-list')
    postList(@Request() req: express.Request) {
        return this.userService.postList(req);
    }

    @UseGuards(AuthGuard('protect'))
    @Put('info')
    updateInfo(
        @Body() updateInfoDto: UpdateInfoDto,
        @Request() req: express.Request,
    ) {
        return this.userService.updateInfo(updateInfoDto, req);
    }
}
