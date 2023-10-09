import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: '*', credentials: true },
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(
    '/upload',
    express.static('/home/hoolo/Desktop/web/nest-social/public/upload'),
  );
  app.use(helmet());
  app.use(cookieParser());
  await app.listen(5000);
}
bootstrap();
