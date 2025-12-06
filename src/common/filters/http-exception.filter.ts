import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    console.error('Exception caught:');
    console.error(exception);
    if (exception instanceof Error && exception.stack) {
      console.error('Stack trace:');
      console.error(exception.stack);
    }

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let errors: any = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse: any = exception.getResponse();

      if (Array.isArray(exceptionResponse.message)) {
        message = 'Validation failed';
        errors = {};
        
        exceptionResponse.message.forEach((errorMessage: string) => {
          const fieldMatch = errorMessage.match(/^(\w+)\s/);
          const fieldName = fieldMatch ? fieldMatch[1] : 'general';
          
          if (!errors[fieldName])
            errors[fieldName] = [];
          
          errors[fieldName].push(errorMessage);
        });
      } else {
        message = exceptionResponse.message || message;
        errors = exceptionResponse.errors ?? null;
      }
      }
      
    const responseBody: any = {
      status: false,
      statusCode: status,
      message,
    };

    if (errors)
      responseBody.errors = errors;

    response.status(status).json(responseBody);
  }
}
