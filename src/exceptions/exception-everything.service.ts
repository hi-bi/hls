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
      ) {}
  
    catch(exception: unknown, host: ArgumentsHost): void {
      // In certain situations `httpAdapter` might not be available in the
      // constructor method, thus we should resolve it here.
      const { httpAdapter } = this.httpAdapterHost;
  
      const ctx = host.switchToHttp();
  
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

      const responseBody = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        path: url,
      };
//      process.stdout.write(`[${host.getType()}] - [${now.split('T')}] - [Request] - [${url}] - [${method}] - [${JSON.stringify(body)}]\n`);
      this.logger.log(`[Request] - [${url}] - [${method}] - [${JSON.stringify(body)}]`, 'ExceptionFilter')

//      process.stdout.write(`[${context.getClass().name}] - [${now}] - [Request] - [${url}] - [${method}] - [${body}]\n`);

//      process.stdout.write(`[${host.getType()}] - [${now.split('T')}] - [Response] - [${httpStatus}] - [${JSON.stringify(responseBody)}]\n`);
      this.logger.log(`[Response] - [${httpStatus}] - [${exceptionStack}]`, 'ExceptionFilter')

      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
  }
  