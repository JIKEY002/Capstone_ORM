import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentDto {
    @IsNumber()
    @IsNotEmpty()
    postId: number;

    @IsNotEmpty()
    @IsString()
    content: string;
}
