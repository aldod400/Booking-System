import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Observable, map } from 'rxjs';

export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const response = context.switchToHttp().getResponse();
        
        return next.handle().pipe(
        map((res) => {
            return {
            status: res?.status ?? true,
            statusCode: res.statusCode ?? response.statusCode,
            message: res?.message ?? 'Request successful',
            data: instanceToPlain(res?.data ?? res),
            };
        }),
        );
  }
}