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
            console.error(err, 'Unhandled Rejection error');
          })
          .on('uncaughtException', (err) => {
            console.error(err, 'Uncaught Exception thrown error');
          });
            
      }

    catch(exception: unknown, host: ArgumentsHost): void {
      // In certain situations `httpAdapter` might not be available in the
      // constructor method, thus we should resolve it here.
      const { httpAdapter } = this.httpAdapterHost;
  
      const ctx = host.switchToHttp();

      let appError = exception as Error;
        console.log('exception: ', exception, appError.name, appError.message);
        

      let errorType = 0;
//      let appError: string = '';

      const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      if (httpStatus == 500) {

//        appError = exception as string;

        if (appError.stack.search('Unhandled Rejection') >= 0 ) {
          errorType = 1
        } else {
          errorType = 2
        }
      }   
      
      const exceptionStack =
      exception instanceof HttpException
        ? exception.stack
        : host.getType();

      const now = new Date().toISOString();
      const url = httpAdapter.getRequestUrl(ctx.getRequest());
      const method = httpAdapter.getRequestMethod(ctx.getRequest());
      const body = ctx.getRequest().body;

      switch (errorType) {
        case 1:
          this.logger.error(`[Request] - [${url}] - [${method}] - [${JSON.stringify(body)}]`, AllExceptionsFilter.name)
          this.logger.error(`[Unhandled Rejection] - [${appError.name}]: [${appError.message}] -[${appError.stack}]`, AllExceptionsFilter.name)
          
          break;
      
        case 2:
          this.logger.error(`[Request] - [${url}] - [${method}] - [${JSON.stringify(body)}]`, AllExceptionsFilter.name)
          this.logger.error(`[Unhandled Rejection] - [${appError.name}]: [${appError.message}] -[${appError.stack}]`, AllExceptionsFilter.name)
        
          break;

        default:
          this.logger.log(`[Request] - [${url}] - [${method}] - [${JSON.stringify(body)}]`, AllExceptionsFilter.name)
          this.logger.log(`[Response] - [${httpStatus}] - [${exceptionStack}]`, AllExceptionsFilter.name)

          break;
      }
      

      const responseBody = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        path: url,
      };
/*      
//      process.stdout.write(`[${host.getType()}] - [${now.split('T')}] - [Request] - [${url}] - [${method}] - [${JSON.stringify(body)}]\n`);
      this.logger.log(`[Request] - [${url}] - [${method}] - [${JSON.stringify(body)}]`, AllExceptionsFilter.name)

//      process.stdout.write(`[${context.getClass().name}] - [${now}] - [Request] - [${url}] - [${method}] - [${body}]\n`);

//      process.stdout.write(`[${host.getType()}] - [${now.split('T')}] - [Response] - [${httpStatus}] - [${JSON.stringify(responseBody)}]\n`);
      this.logger.log(`[Response] - [${httpStatus}] - [${exceptionStack}]`, AllExceptionsFilter.name)
*/
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
  }
  