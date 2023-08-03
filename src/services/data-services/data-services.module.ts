import { Module } from '@nestjs/common';
//import { MemoryDataServicesModule } from '../../frameworks/data-services/memory/memory-data-service.module';
import { PrismaDataServicesModule } from '../../frameworks/data-services/prisma/prisma-data-service.module';

@Module({
  imports: [PrismaDataServicesModule],
  exports: [PrismaDataServicesModule],
})
export class DataServicesModule {}