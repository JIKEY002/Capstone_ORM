import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SaveDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    postId: number;
}
