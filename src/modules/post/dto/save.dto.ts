import { IsNotEmpty, IsNumber } from 'class-validator';

export class SaveDto {
    @IsNumber()
    @IsNotEmpty()
    postId: number;
}
