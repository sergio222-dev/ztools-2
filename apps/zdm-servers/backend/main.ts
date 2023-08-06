import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import { CustomZodValidationExceptionFilter } from './middleware/filters/CustomZodValidationExceptionFilter';
import { AllExceptionFilter } from './middleware/filters/AllExceptionFilter';

async function bootstrap() {
  patchNestJsSwagger();
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalFilters(
    new CustomZodValidationExceptionFilter(),
    new AllExceptionFilter(),
  );

  const config = new DocumentBuilder()
    .setTitle('Starter Server')
    .setDescription('Starter Server API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.ZDM_SERVER_PORT as string);
}

// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrap().then(() => {
  console.log(`Server Started on port ${process.env.ZDM_SERVER_PORT}`);
});
