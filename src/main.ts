import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { APP_PORT } from './common/constant/app.constant';

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
  app.setGlobalPrefix('api');
  await app.listen(APP_PORT, () => {
    console.log(`Application is running on: http://localhost:${APP_PORT}/api`);
  });
}

bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
});
