import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoggerService } from 'src/services/logging-services/logging-services.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  constructor(private logger: LoggerService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
    const req = context.switchToHttp().getRequest();
    const url = req.url;
    const method = req.method;
    const body = JSON.stringify(req.body);
    const now = new Date().toISOString().split('T');
    
//    process.stdout.write(`[${context.getClass().name}] - [${now}] - [Request] - [${url}] - [${method}] - [${body}]\n`);
    this.logger.log(`[Request] - [${url}] - [${method}] - [${body}]`, context.getClass().name)

    return next
      .handle()
      .pipe(

        tap((value) => {
          const res = context.switchToHttp().getResponse();
          const now = new Date().toISOString().split('T');
//          process.stdout.write(`[${context.getClass().name}] - [${now}] - [Response] - [${res.statusCode}] - [${JSON.stringify(value)}]\n`);
          this.logger.log(`[Response] - [${res.statusCode}] - [${JSON.stringify(value)}]`, context.getClass().name)
        }),

        catchError((err) => {
//          console.log('interseptor catch error: ', err);
            const httpStatus =
            err instanceof HttpException
              ? err.getStatus()
              : HttpStatus.INTERNAL_SERVER_ERROR;

          if (httpStatus !== HttpStatus.INTERNAL_SERVER_ERROR) {
            throw err;  
          } else {

            const appError = err as Error
            const request: Request = context.switchToHttp().getRequest();
            this.logger.error(`[Uncaught Exception] - [${appError?.name}]: [${appError?.message}] -[${appError?.stack}]`, LoggingInterceptor.name)
  
            return throwError(
              () =>
                new HttpException(
                  {
                    message: err?.message || err?.detail || "Internal error",
                    timestamp: new Date().toISOString(),
                    route: request.url,
                    method: request.method,
                    stack: appError?.stack
                  },
                  err.statusCode || 500
                )
            );
  
          }

        })        
      );
  }
} 