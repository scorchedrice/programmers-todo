import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: ['GET, PUT, PATCH, POST, DELETE'],
    allowedHeader: ['Content-Type, authorization'],
    credentials: true,
  })
  await app.listen(3000);
}
bootstrap();
