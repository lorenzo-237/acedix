import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
// import { validNodeEnv } from './functions';

import swagger from './swagger';
import { ValidationPipe } from '@nestjs/common';

const GLOBAL_PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(GLOBAL_PREFIX);

  const env = app.get(ConfigService);

  // const nodeEnv = validNodeEnv(env.get('NODE_ENV'));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  swagger.initialize(app);

  await app.listen(parseInt(env.get<string>('APP_PORT')));
}
bootstrap();
