import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class GetCommentDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    id: number;
}
