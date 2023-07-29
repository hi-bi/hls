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
    return this.dataServices.album.getAll();
  }

  getAlbumById(id: string): Promise<Album> {
    return this.dataServices.album.get(id);
  }

  createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = this.albumFactoryService.createNewAlbum(createAlbumDto);
    return this.dataServices.album.create(album);
  }

  updateAlbum(
    albumId: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const album = this.albumFactoryService.updateAlbum(updateAlbumDto);
    return this.dataServices.album.update(albumId, album);
  }
}