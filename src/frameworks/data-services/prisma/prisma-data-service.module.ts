import { Module } from '@nestjs/common';
import { PrismaDataServices } from './prisma-data-services.service';
import { PrismaService } from './prisma-client.service';
import { PrismaArtistRepository } from './prisma-artist-repository';
import { PrismaAlbumRepository } from './prisma-album-repository';
import { PrismaFavoritesRepository } from './prisma-favorites-repository';


@Module({
  providers: [
    PrismaService,
    PrismaDataServices,
    PrismaArtistRepository,
    PrismaAlbumRepository,
    PrismaFavoritesRepository,
  ],
  exports: [
    PrismaDataServices, 
    PrismaArtistRepository,
    PrismaAlbumRepository,
    PrismaFavoritesRepository,
    PrismaService
  ],
})
export class PrismaDataServicesModule {}