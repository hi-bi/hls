import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { TrackFactoryService } from './track-factory.service';
import { TrackUseCases } from './track.use-case';

@Module({
  imports: [DataServicesModule],
  providers: [TrackFactoryService, TrackUseCases],
  exports: [TrackFactoryService, TrackUseCases],
})
export class TrackUseCasesModule {}