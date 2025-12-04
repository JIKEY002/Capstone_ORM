import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { APP_PORT } from './common/constant/app.constant';
import TransformInterceptor from './common/interceptors/transform.interceptor';
import AllExceptionsFilter from './filters/all-exceptions.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('Capstone ORM API')
        .setDescription(
            'Complete API documentation for Capstone ORM project with JWT authentication and file upload support',
        )
        .setVersion('1.0.0')
        .addServer('http://localhost:3069/api', 'Local Development Server')
        .addServer('https://capstone.zerotwo.biz/api', 'Production Server')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token (from login response)',
                in: 'header',
            },
            'access-token',
        )
        .addTag('Authentication', 'User registration and login endpoints')
        .addTag('Posts', 'Post management, comments, and save functionality')
        .addTag('User', 'User profile and posts management')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    // Global transform for successful responses
    app.useGlobalInterceptors(new TransformInterceptor());

    // Global exception filter to normalize errors
    app.useGlobalFilters(new AllExceptionsFilter());

    app.setGlobalPrefix('api');

    SwaggerModule.setup('api-docs', app, document);

    await app.listen(APP_PORT, () => {
        console.log(
            `Application is running on: http://localhost:${APP_PORT}/api`,
        );
    });
}

bootstrap().catch((err) => {
    console.error('Error during application bootstrap:', err);
});
