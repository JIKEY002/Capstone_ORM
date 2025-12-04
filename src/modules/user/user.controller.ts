import { Controller, UseGuards, Request, Get, Put, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import * as express from 'express';

import { UserService } from './user.service';
import { UpdateInfoDto } from './dto/updateInfo.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard('protect'))
    @Get('info')
    @ApiBearerAuth('access-token')
    @ApiOperation({
        summary: 'Get user info',
        description: 'Get current authenticated user profile information',
    })
    info(@Request() req: express.Request) {
        return this.userService.info(req);
    }

    @UseGuards(AuthGuard('protect'))
    @Get('posts-save')
    @ApiBearerAuth('access-token')
    @ApiOperation({
        summary: 'Get saved posts',
        description:
            'Retrieve all posts that have been saved/bookmarked by the current user',
    })
    postSave(@Request() req: express.Request) {
        return this.userService.postSave(req);
    }

    @UseGuards(AuthGuard('protect'))
    @Get('posts-list')
    @ApiBearerAuth('access-token')
    @ApiOperation({
        summary: 'Get user posts',
        description: 'Retrieve all posts created by the current user',
    })
    postList(@Request() req: express.Request) {
        return this.userService.postList(req);
    }

    @UseGuards(AuthGuard('protect'))
    @Put('info')
    @ApiBearerAuth('access-token')
    @ApiOperation({
        summary: 'Update user info',
        description:
            'Update current user profile information (avatar, name, bio, website, username)',
    })
    @ApiBody({ type: UpdateInfoDto })
    updateInfo(
        @Body() updateInfoDto: UpdateInfoDto,
        @Request() req: express.Request,
    ) {
        return this.userService.updateInfo(updateInfoDto, req);
    }
}
