import { Injectable } from '@nestjs/common';
//import { Album } from '../../core/entities';
//import { IDataServices } from '../../core/abstracts';
import { PrismaDataServices } from 'src/frameworks/data-services/prisma/prisma-data-services.service';
import { CreateAlbumDto, UpdateAlbumDto } from '../../core/dtos';
import { AlbumFactoryService } from './album-factory.service';
import { Album } from '@prisma/client';

@Injectable()
export class AlbumUseCases {
  constructor(
    private dataServices: PrismaDataServices,
    private albumFactoryService: AlbumFactoryService,
  ) {}

  getAllAlbums(): Promise<Album[]> {
    return new Promise ((resolve, reject) => {
      resolve(this.dataServices.album.getAll()); 
    })
  }

  getAlbumById(id: string): Promise<Album> {
    return new Promise ((resolve, reject) => {
      resolve(this.dataServices.album.get(id)); 
    })
  }

  createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return new Promise ((resolve, reject) => {
      const album = this.albumFactoryService.createNewAlbum(createAlbumDto);
      resolve( this.dataServices.album.create(album));
    })
  }

  updateAlbum(
    albumId: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return new Promise ((resolve, reject) => {
      const album = this.albumFactoryService.updateAlbum(updateAlbumDto);
      resolve( this.dataServices.album.update(albumId, album));
    })
  }

  deleteAlbum(
    albumId: string,
  ): Promise<unknown> {
    return new Promise ((resolve, reject) => {
      resolve(this.dataServices.album.delete(albumId));
    })
  }

}