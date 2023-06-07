import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Response } from './common/interceptors/response';
import { HttpFilter } from './common/interceptors/catchFilters';
import { ValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new Response());
  app.useGlobalFilters(new HttpFilter());
  await app.listen(3000);
}
bootstrap();
