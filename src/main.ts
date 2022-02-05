import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module.js';
import { serverSettings } from './config.js'

async function bootstrap() {

  const app = serverSettings.framework ? 
     await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  :  await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  await app.listen(serverSettings.serverPort);
  process.stdout.write(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();