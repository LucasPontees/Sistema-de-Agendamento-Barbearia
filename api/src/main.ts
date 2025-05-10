import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('api-service')
    .setDescription('API para objetos de estudo')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.use('/docs', apiReference({
    content: document,
    theme: 'solarized', // 'default' | 'dark' | 'purple' | 'solarized'
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
