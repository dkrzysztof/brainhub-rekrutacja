import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService<ConfigKeys>>(ConfigService);

  app.enableCors({
    origin: [config.get('APP_ORIGIN')],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const PORT = config.get('PORT');
  await app.listen(PORT);
  console.info(
    `\x1b[33m[SERVER]:\x1b[32m`,
    `Server is running on port`,
    `${PORT}`,
  );
}
bootstrap();
