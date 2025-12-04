import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateInfoDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'https://example.com/avatar.jpg' })
    avatar?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'John' })
    fistname?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'Doe' })
    name?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'Hello, I am John Doe.' })
    introduce?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'https://example.com' })
    website?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @MinLength(6)
    @ApiProperty({ example: 'johndoe' })
    username?: string;
}
