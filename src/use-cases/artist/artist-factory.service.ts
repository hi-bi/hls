import { Injectable } from '@nestjs/common';
import { Artist } from '../../core/entities';
import { CreateArtistDto, UpdateArtistDto } from '../../core/dtos';

@Injectable()
export class ArtistFactoryService {
  createNewArtist(createArtistDto: CreateArtistDto) {
    const newArtist = new Artist();
    newArtist.name = createArtistDto.name;
    newArtist.grammy = createArtistDto.grammy;

    return newArtist;
  }

  updateArtist(updateArtistDto: UpdateArtistDto) {
    const newArtist = new Artist();
    newArtist.name = updateArtistDto.name;
    newArtist.grammy = updateArtistDto.grammy;

    return newArtist;
  }
}