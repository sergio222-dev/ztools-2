import { ZodValidationException } from 'nestjs-zod';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class CustomZodValidationExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);
    const context = host.switchToHttp();
    const response = context.getResponse();
    const error = exception.getZodError();

    response.status(400).json({
      statusCode: 400,
      message: error.message,
    });
  }
}
