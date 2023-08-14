import { Module } from '@nestjs/common';
import { MemoryDataServicesModule } from '../../frameworks/data-services/memory/memory-data-service.module';

@Module({
  imports: [MemoryDataServicesModule],
  exports: [MemoryDataServicesModule],
})
export class DataServicesModule {}