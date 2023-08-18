import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logging-services.service';

@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerServiceModule {}