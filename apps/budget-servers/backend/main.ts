import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Transactions')
    .setDescription('Transactions API')
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
