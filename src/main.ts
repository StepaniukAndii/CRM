import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { ContentTypeFilter } from './filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ContentTypeFilter());
  app.enableCors();
  await app.listen(5000);
  console.log((await app.getUrl()).toString());
}
bootstrap();
