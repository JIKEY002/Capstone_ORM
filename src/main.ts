import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

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

    // Global transform for successful responses
    app.useGlobalInterceptors(new TransformInterceptor());

    // Global exception filter to normalize errors
    app.useGlobalFilters(new AllExceptionsFilter());

    app.setGlobalPrefix('api');
    await app.listen(APP_PORT, () => {
        console.log(
            `Application is running on: http://localhost:${APP_PORT}/api`,
        );
    });
}

bootstrap().catch((err) => {
    console.error('Error during application bootstrap:', err);
});
