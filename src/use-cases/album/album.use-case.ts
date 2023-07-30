import { Injectable } from '@nestjs/common';
import { Album } from '../../core/entities';
import { IDataServices } from '../../core/abstracts';
import { CreateAlbumDto, UpdateAlbumDto } from '../../core/dtos';
import { AlbumFactoryService } from './album-factory.service';

@Injectable()
export class AlbumUseCases {
  constructor(
    private dataServices: IDataServices,
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
  ): Promise<Album> {
    return new Promise ((resolve, reject) => {
      resolve(this.dataServices.album.delete(albumId));
    })
  }

}