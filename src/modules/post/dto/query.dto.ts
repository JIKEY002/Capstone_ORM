import { IsJSON, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class QueryDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @ApiProperty({ example: 1 })
    page: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @ApiProperty({ example: 10 })
    pageSize: number;

    @IsOptional()
    @IsJSON()
    @ApiProperty({ example: '{"status":"active"}' })
    filters?: string;
}
