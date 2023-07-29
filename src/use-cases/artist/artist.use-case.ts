import { Injectable } from '@nestjs/common';
import { Artist } from '../../core/entities';
import { IDataServices } from '../../core/abstracts';
import { CreateArtistDto, UpdateArtistDto } from '../../core/dtos';
import { ArtistFactoryService } from './artist-factory.service';

@Injectable()
export class ArtistUseCases {
  constructor(
    private dataServices: IDataServices,
    private artistFactoryService: ArtistFactoryService,
  ) {}

  getAllArtists(): Promise<Artist[]> {
    return this.dataServices.artist.getAll();
  }

  getArtistById(id: string): Promise<Artist> {
    return this.dataServices.artist.get(id);
  }

  createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = this.artistFactoryService.createNewArtist(createArtistDto);
    return this.dataServices.artist.create(artist);
  }

  updateArtist(
    artistId: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = this.artistFactoryService.updateArtist(updateArtistDto);
    return this.dataServices.artist.update(artistId,artist);
  }
}