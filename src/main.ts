import {NestExpressApplication} from '@nestjs/platform-express';
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {join} from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
