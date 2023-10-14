import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import helmet from 'helmet';
import * as path from 'path';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: '*', credentials: true },
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // app.use(
  //   '/upload',
  //   express.static('/cracker/Desktop/web/social-nest/server/public'),
  // );
  app.use(
    '/upload/images',
    express.static(path.join(__dirname, '..', 'public', 'upload', 'images')),
  );
  app.use(helmet());
  app.use(cookieParser());
  await app.listen(5000);
}
bootstrap();
