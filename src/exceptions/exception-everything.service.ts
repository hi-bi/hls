import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,

  } from '@nestjs/common';
  import { HttpAdapterHost } from '@nestjs/core';
  import { LoggerService } from 'src/services/logging-services/logging-services.service';

  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {

    constructor(
      private readonly httpAdapterHost: HttpAdapterHost,
      private logger: LoggerService
      ) {

        process
          .on('unhandledRejection', (err) => {
            let appError = err as Error
            //console.error(err, 'Unhandled Rejection error');
            this.logger.error(`[Unhandled Rejection] - [${appError.name}]: [${appError.message}] -[${appError.stack}]`, AllExceptionsFilter.name)
  
          })
          .on('uncaughtException', (err) => {
            let appError = err as Error
            //console.error(err, 'Uncaught Exception thrown error');
            this.logger.error(`[Uncaught Exception] - [${appError.name}]: [${appError.message}] -[${appError.stack}]`, AllExceptionsFilter.name)

          });
            
      }

    catch(exception: unknown, host: ArgumentsHost): void {
      // In certain situations `httpAdapter` might not be available in the
      // constructor method, thus we should resolve it here.
      const { httpAdapter } = this.httpAdapterHost;
  
      const ctx = host.switchToHttp();

//      let appError = exception as Error;
//      console.log('exception: ', exception, appError.name, appError.message);

      const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      const exceptionStack =
      exception instanceof HttpException
        ? exception.stack
        : host.getType();

      const now = new Date().toISOString();
      const url = httpAdapter.getRequestUrl(ctx.getRequest());
      const method = httpAdapter.getRequestMethod(ctx.getRequest());
      const body = ctx.getRequest().body;

      this.logger.error(`[Request] - [${url}] - [${method}] - [${JSON.stringify(body)}]`, AllExceptionsFilter.name)
      this.logger.error(`[Exception] - [${httpStatus}] - [${exceptionStack}]`, AllExceptionsFilter.name)

      const responseBody = {
        statusCode: httpStatus,
        message: 'Internal server error',
//        timestamp: new Date().toISOString(),
//        path: url,
      };

      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
  }
  