import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateInfoDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    avatar?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    fistname?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    introduce?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    website?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @MinLength(6)
    username?: string;
}
