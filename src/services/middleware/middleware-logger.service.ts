import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from 'src/services/logging-services/logging-services.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  constructor(private logger: LoggerService) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url } = request;
    const userAgent = request.get('user-agent') || '';

    console.log('LoggerMiddleware');

    response.on('close', () => {

      const { statusCode } = response;

      this.logger.log(
        `close ${method} ${url} ${statusCode}`,
        LoggerMiddleware.name
      );
    });

    response.on('unhandledRejection', () => {

      const { statusCode } = response;

      this.logger.log(
        `close ${method} ${url} ${statusCode}`,
        LoggerMiddleware.name
      );
    });

    response.on('finish', () => {

      const { statusCode } = response;

      this.logger.log(
        `finish ${method} ${url} ${statusCode}`,
        LoggerMiddleware.name
      );
    });

    next();
  }
}
