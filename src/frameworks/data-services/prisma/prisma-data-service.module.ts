import { Module } from '@nestjs/common';
import { PrismaDataServices } from './prisma-data-services.service';
import { PrismaService } from './prisma-client.service';
import { PrismaAlbumRepository } from './prisma-album-repository';

@Module({
  providers: [
    PrismaService,
    PrismaDataServices,
    PrismaAlbumRepository
  ],
  exports: [
    PrismaDataServices, 
    PrismaAlbumRepository,
    PrismaService
  ],
})
export class PrismaDataServicesModule {}