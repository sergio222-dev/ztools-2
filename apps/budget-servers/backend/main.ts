import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Budget Server')
    .setDescription('Busdget Server API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.BUDGET_SERVER_PORT as string);
}

// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrap().then(() => {
  console.log(`Server Started on port ${process.env.BUDGET_SERVER_PORT}`);
});
