import { Injectable } from '@nestjs/common';
//import { Artist } from '../../core/entities';
//import { IDataServices } from '../../core/abstracts';
import { PrismaDataServices } from 'src/frameworks/data-services/prisma/prisma-data-services.service';
import { CreateArtistDto, UpdateArtistDto } from '../../core/dtos';
import { ArtistFactoryService } from './artist-factory.service';
import { Artist } from '@prisma/client';


@Injectable()
export class ArtistUseCases {
  constructor(
    private dataServices: PrismaDataServices,
    private artistFactoryService: ArtistFactoryService,
  ) {}

  getAllArtists(): Promise<Artist[]> {
    return new Promise ((resolve, reject) => {
      resolve(this.dataServices.artist.getAll()); 
    })
  }

  getArtistById(id: string): Promise<Artist> {
    return new Promise ((resolve, reject) => {
      resolve(this.dataServices.artist.get(id)); 
    })
  }

  createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    return new Promise ((resolve, reject) => {
      const artist = this.artistFactoryService.createNewArtist(createArtistDto);
      resolve( this.dataServices.artist.create(artist));
    })
  }

  updateArtist(
    artistId: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return new Promise ((resolve, reject) => {
      const artist = this.artistFactoryService.updateArtist(updateArtistDto);
      resolve( this.dataServices.artist.update(artistId,artist));
    })
  }

  deleteArtist(
    artistId: string,
  ): Promise<unknown> {
    return new Promise ((resolve, reject) => {
      resolve( this.dataServices.artist.delete(artistId));
    })
  }

}