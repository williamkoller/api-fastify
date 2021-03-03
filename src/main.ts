import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from '@/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'fastify-helmet';
import {
  TransformInterceptor,
  LoggingInterceptor,
} from '@/common/interceptors';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.getHttpAdapter().getInstance().register(helmet);

  app.setGlobalPrefix('api');

  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );

  const config = new DocumentBuilder()
    .setTitle('Users example')
    .setDescription('The user API description')
    .setVersion('1.0')
    .addTag('user')
    .addTag('auth')
    .addTag('me')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT, () => logger.log('API Fastify'));
}
bootstrap();
