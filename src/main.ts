import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  console.log(process.env.URL,"URLAFHJGHAJFDHJAGFGHAFGHJASFG")
  app.enableCors({
    origin: [process.env.URL],
    credentials: true,
    methods : ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type','Authorization']
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

