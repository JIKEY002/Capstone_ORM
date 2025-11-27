import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    href: string;

    @IsString()
    @IsOptional()
    desc: string;
}
