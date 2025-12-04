import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'user@example.com' })
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'strongPassword123' })
    password: string;
}
