import { Module } from '@nestjs/common';
import { IDataServices } from '../../../core';
import { MemoryDataServices } from './memory-data-services.service';

@Module({
  providers: [
    {
      provide: IDataServices,
      useClass: MemoryDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MemoryDataServicesModule {}