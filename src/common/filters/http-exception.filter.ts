import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException} from '@nestjs/common';

@Catch(HttpException) 
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    console.error('Http Exception caught:');
    console.error(exception);

    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    let message = 'Internal Server Error';
    let errors: any = null;

    if (Array.isArray(exceptionResponse.message)) {
      message = 'Validation failed';
      errors = {};

      exceptionResponse.message.forEach((errorMessage: string) => {
        const fieldMatch = errorMessage.match(/^(\w+)\s/);
        const fieldName = fieldMatch ? fieldMatch[1] : 'general';

        if (!errors[fieldName]) errors[fieldName] = [];

        errors[fieldName].push(errorMessage);
      });
    } else {
      message = exceptionResponse.message || message;
      errors = exceptionResponse.errors ?? null;
    }

    const responseBody: any = {
      statusCode: status,
      message,
    };

    if (errors) responseBody.errors = errors;

    response.status(status).json(responseBody);
  }
}
