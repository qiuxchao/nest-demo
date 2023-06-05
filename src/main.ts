import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Response } from './common/interceptors/response';
import { HttpFilter } from './common/interceptors/catchFilters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new Response());
  app.useGlobalFilters(new HttpFilter());
  await app.listen(3000);
}
bootstrap();
