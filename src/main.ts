import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    next();
  })
  await app.listen(3000);
}
bootstrap();
