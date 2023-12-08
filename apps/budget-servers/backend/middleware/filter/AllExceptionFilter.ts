import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';

export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // console.log(exception);
    const context = host.switchToHttp();
    const response = context.getResponse();
    let status: number;
    try {
      status = exception?.getStatus() ?? 500;
    } catch {
      status = 500;
    }

    console.log('exception', status);

    response.status(status).json({
      statusCode: status,
      message: exception?.message,
    });
  }
}
