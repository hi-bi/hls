  import { Injectable, ConsoleLogger } from '@nestjs/common';
  import { statSync, writeFile, writeFileSync } from 'node:fs';
  import { EOL } from 'node:os';

  @Injectable()
  export class LoggerService extends ConsoleLogger {
      
      private loggingLevel: number;   
      private isFileLogging: boolean;
      private loggingGeneralFileName: string;
      private loggingGeneralFileSize: number;
      private isErrorFileLogging: boolean;
      private loggingErrorFileName: string;
      private loggingErrorFileSize: number;

      constructor ( ) {
          super();
          
          this.loggingLevel = parseInt( process.env.LOGGING_LEVEL || '4');
          this.isFileLogging = process.env.IS_FILE_LOGGING == 'true';
          this.loggingGeneralFileName = process.env.LOGGING_GENERAL_FILE_NAME || 'general.log';
          this.loggingGeneralFileSize = parseInt( process.env.LOGGING_GENERAL_FILE_SIZE || '64') * 1024;
          this.isErrorFileLogging = process.env.IS_ERROR_FILE_LOGGING === 'true';
          this.loggingErrorFileName = process.env.LOGGING_ERROR_FILE_NAME || 'general.log';
          this.loggingErrorFileSize = parseInt( process.env.LOGGING_ERROR_FILE_SIZE || '64') * 1024;

          if (this.isFileLogging) {
            writeFileSync(this.loggingGeneralFileName, '', {encoding: 'utf8', flag: 'a+'})          
          }
          if (this.isErrorFileLogging) {
            writeFileSync(this.loggingErrorFileName, '', {encoding: 'utf8', flag: 'a+'})          
          }
      }
      
    /**
     * Write a 'log' level log.
     */
    log(message: any, context?: string) {
      if (this.loggingLevel >= 0) {
          if (!this.isFileLogging) {
            //super.log(message, context);
            this.writeToProcess('LOG', message, context);
          }
          else {
  //          console.log('LOG writeToGeneralFile')
            this.writeToGeneralFile('LOG', message, context);
          };
      }
    }

    /**
     * Write an 'error' level log.
     */
    error(message: any, context?: string) {
      if (this.loggingLevel >= 1) {
          if (!this.isFileLogging) {
            //super.error(message, context);
            this.writeToProcess('ERROR', message, context);
          }
          else {
            if (this.isErrorFileLogging) {
              this.writeToErrorFile('ERROR', message, context);
            } else {
              this.writeToGeneralFile('ERROR', message, context);
            }
          };
      }
    }

    /**
     * Write a 'warn' level log.
     */
    warn(message: any, context?: string) {
      if (this.loggingLevel >= 2) {
          if (!this.isFileLogging) {
            //super.warn(message, context);
            this.writeToProcess('WARN', message, context);
          }
          else {
            this.writeToGeneralFile('WARN', message, context);
          };
      }
    }

    /**
     * Write a 'debug' level log.
     */
    debug(message: any, context?: string) {
      if (this.loggingLevel >= 3) {
          if (!this.isFileLogging) {
            //super.debug(message, context);
            this.writeToProcess('DEBUG', message, context);
          }
          else {
            this.writeToGeneralFile('DEBUG', message, context);
          };
      }
    }

    /**
     * Write a 'verbose' level log.
     */
    verbose(message: any, context?: string) {
      if (this.loggingLevel >= 4) {
          if (!this.isFileLogging) {
            //super.verbose(message, context);
            this.writeToProcess('VERBOSE', message, context);
          }
          else {
            this.writeToGeneralFile('VERBOSE', message, context);
          };
      }
    }

    writeToProcess(type: string, message: any, context: string) {

      const now = new Date().toISOString().split('T');

      process.stdout.write(`[${now}] - [${type}] - [${context}] - [${message}]\n`);
    }

    writeToGeneralFile(type: string, message: any, context: string) {

      const now = new Date().toISOString().split('T');
      const logString = `[${now}] - [${type}] - [${context}] - [${message}]` + EOL;

      writeFile(this.loggingGeneralFileName, logString, {encoding: 'utf8', flag: 'a+'}, (err) => {
        if (err) {
          console.error('Error to write general log.');
          throw err;
        }
      });

      const stats = statSync(this.loggingGeneralFileName);
      const fileSizeInBytes = stats.size;
      if (fileSizeInBytes >= this.loggingGeneralFileSize) {
        writeFile(this.loggingGeneralFileName, logString, {encoding: 'utf8', flag: 'w+'}, (err) => {
          if (err) {
            console.error('Error to write general log.');
            throw err;
          }
        });
  
      }
    }

    writeToErrorFile(type: string, message: any, context: string) {

      const now = new Date().toISOString().split('T');
      const logString = `[${now}] - [${type}] - [${context}] - [${message}]` + EOL;

      writeFile(this.loggingErrorFileName, logString, {encoding: 'utf8', flag: 'a+'}, (err) => {
        if (err) {
          console.error('Error to write error log.');
          throw err;
        }
      });

      const stats = statSync(this.loggingErrorFileName);
      const fileSizeInBytes = stats.size;
      if (fileSizeInBytes >= this.loggingErrorFileSize) {
        writeFile(this.loggingErrorFileName, logString, {encoding: 'utf8', flag: 'w+'}, (err) => {
          if (err) {
            console.error('Error to write error log.');
            throw err;
          }
        });
  
      }
    }

  }
