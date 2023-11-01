import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';

import { AppModule } from './app.module';
import { AllExceptionFilter } from './middleware/filter/AllExceptionFilter';
import { CustomZodValidationExceptionFilter } from './middleware/filter/CustomZodValidationExceptionFilter';

async function bootstrap() {
    patchNestJsSwagger();
    const app = await NestFactory.create(AppModule, {
        cors: true,
    });

    app.useGlobalFilters(new AllExceptionFilter(), new CustomZodValidationExceptionFilter());

    const config = new DocumentBuilder()
        .setTitle('Budget Server')
        .setDescription('Budget Server API')
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

    await app.listen(process.env.BUDGET_SERVER_PORT as string);
}

// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrap().then(() => {
    console.log(`Server Started on port ${process.env.BUDGET_SERVER_PORT}`);
});
