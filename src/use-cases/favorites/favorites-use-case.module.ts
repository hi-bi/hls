import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { FavoritesUseCases } from './favorites.use-case';

@Module({
  imports: [DataServicesModule],
  providers: [FavoritesUseCases],
  exports: [FavoritesUseCases],
})
export class FavoritesUseCasesModule {}