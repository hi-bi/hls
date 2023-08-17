import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
    const req = context.switchToHttp().getRequest();
    const url = req.url;
    const method = req.method;
    const body = req.body;
    
//    console.log(context.getClass().name, `${url} ${method} ${body}`);
    console.log(context.getClass().name, url, method, body);

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap((res) => {
            console.log('Response: ', context.switchToHttp().getResponse().statusCode, res, );
        })
      );
  }
}