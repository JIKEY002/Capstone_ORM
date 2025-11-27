import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetCommentDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
