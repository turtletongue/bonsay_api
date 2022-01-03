import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const documentConfig = new DocumentBuilder()
    .setTitle('Bonsay')
    .setDescription('Bonsay API description.')
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);

  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
