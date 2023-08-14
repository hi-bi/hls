import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { AlbumFactoryService } from './album-factory.service';
import { AlbumUseCases } from './album.use-case';

@Module({
  imports: [DataServicesModule],
  providers: [AlbumFactoryService, AlbumUseCases],
  exports: [AlbumFactoryService, AlbumUseCases],
})
export class AlbumUseCasesModule {}