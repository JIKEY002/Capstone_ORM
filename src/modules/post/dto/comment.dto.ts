import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CommentDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    postId: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'This is a comment.' })
    content: string;
}
