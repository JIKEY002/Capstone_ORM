import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiOperation({
        summary: 'Register new user',
        description:
            'Create a new user account with email, password, and profile information',
    })
    @ApiBody({ type: RegisterDto })
    async register(@Body() registerDto: RegisterDto): Promise<any> {
        return this.authService.register(registerDto);
    }

    @Post('login')
    @ApiOperation({
        summary: 'User login',
        description:
            'Authenticate user with email and password, returns JWT access token',
    })
    @ApiBody({ type: LoginDto })
    async login(@Body() loginDto: LoginDto): Promise<any> {
        return this.authService.login(loginDto);
    }
}
