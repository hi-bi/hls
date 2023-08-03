import { Module } from '@nestjs/common';
import { IDataServices } from '../../../core';
import { PrismaDataServices } from './prisma-data-services.service';

@Module({
  providers: [
    {
      provide: IDataServices,
      useClass: PrismaDataServices,
    },
  ],
  exports: [IDataServices],
})
export class PrismaDataServicesModule {}