import { Controller, Get, Query } from '@nestjs/common';

import { PostService } from './post.service';
import { QueryDto } from './dto/query.dto';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    findAll(@Query() queryDto: QueryDto): Promise<any> {
        return this.postService.findAll(queryDto);
    }
}
