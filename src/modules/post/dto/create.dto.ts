import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Sample Title' })
    title: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'https://example.com' })
    href: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'This is a sample description.' })
    desc: string;
}
