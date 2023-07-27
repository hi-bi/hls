import { Injectable } from '@nestjs/common';
import { Album } from '../../core/entities';
import { CreateAlbumDto, UpdateAlbumDto } from '../../core/dtos';

@Injectable()
export class AlbumFactoryService {
  createNewAlbum(createAlbumDto: CreateAlbumDto) {
    const newAlbum = new Album();
    newAlbum.name = createAlbumDto.name;
    newAlbum.year = createAlbumDto.year;
    newAlbum.artistId = createAlbumDto.artistId;

    return newAlbum;
  }

  updateAlbum(updateAlbumDto: UpdateAlbumDto) {
    const newAlbum = new Album();
    newAlbum.name = updateAlbumDto.name;
    newAlbum.year = updateAlbumDto.year;
    newAlbum.artistId = updateAlbumDto.artistId;

    return newAlbum;
  }
}