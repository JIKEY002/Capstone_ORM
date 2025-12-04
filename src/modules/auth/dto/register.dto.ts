import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'user@example.com' })
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    @ApiProperty({ example: 'strongPassword123' })
    password: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'John' })
    fistname: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Doe' })
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    @ApiProperty({ example: 30 })
    age?: number;
}
