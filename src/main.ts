import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { validNodeEnv } from './functions';
import swagger from './swagger';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import redix from './acedix/redix';
import * as passport from 'passport';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

const SESSION_NAME = 'acedix-session-id';
const SESSION_SALT = 'super-salt';
const SESSION_MAX_AGE = 4 * 60 * 60 * 1000;
const GLOBAL_PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(GLOBAL_PREFIX);

  const env = app.get(ConfigService);

  const nodeEnv = validNodeEnv(env.get('NODE_ENV'));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  swagger.initialize(app);

  try {
    await redix.initialize();
    app.use(
      session({
        name: SESSION_NAME,
        store: redix.getStore(),
        secret: SESSION_SALT,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: SESSION_MAX_AGE,
          httpOnly: true,
          secure: nodeEnv === 'production',
          signed: true,
        },
      }),
    );
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', error);
  }

  app.use(passport.initialize());
  app.use(passport.session());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(parseInt(env.get<string>('APP_PORT')));
}
bootstrap();
