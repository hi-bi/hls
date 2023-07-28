import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { ArtistFactoryService } from './artist-factory.service';
import { ArtistUseCases } from './artist.use-case';

@Module({
  imports: [DataServicesModule],
  providers: [ArtistFactoryService, ArtistUseCases],
  exports: [ArtistFactoryService, ArtistUseCases],
})
export class ArtistUseCasesModule {}