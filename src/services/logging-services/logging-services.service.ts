import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
    
    private isFileLogging: boolean;
    private loggingLevel: number;
    private loggingGeneralFileName: string;
    private loggingGeneralFileSize: number;
    private loggingErrorFileName: string;
    private loggingErrorFileSize: number;

    constructor ( ) {
        super();
        
        this.isFileLogging = process.env.IS_FILE_LOGGING === 'true';
        this.loggingLevel = parseInt( process.env.LOGGING_LEVEL || '4');
        this.loggingGeneralFileName = process.env.LOGGING_GENERAL_FILE_NAME || 'general.log';
        this.loggingGeneralFileSize = parseInt( process.env.LOGGING_GENERAL_FILE_SIZE || '64') * 1024;
        this.loggingErrorFileName = process.env.LOGGING_ERROR_FILE_NAME || 'general.log';
        this.loggingErrorFileSize = parseInt( process.env.LOGGING_ERROR_FILE_SIZE || '64') * 1024;
    }
    
  /**
   * Write a 'log' level log.
   */
  log(message: any, context?: string) {
    if (this.loggingLevel >= 0) {
        if (!this.isFileLogging) super.log(message, context)
        else {

        };
    }
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, context?: string) {
    if (this.loggingLevel >= 1) {
        if (!this.isFileLogging) super.error(message, context)
        else {
            
        };
    }
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, context?: string) {
    if (this.loggingLevel >= 2) {
        if (!this.isFileLogging) super.warn(message, context)
        else {
            
        };
    }
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any, context?: string) {
    if (this.loggingLevel >= 3) {
        if (!this.isFileLogging) super.debug(message, context)
        else {
            
        };
    }
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any, context?: string) {
    if (this.loggingLevel >= 4) {
        if (!this.isFileLogging) super.verbose(message, context)
        else {
            
        };
    }
  }
}