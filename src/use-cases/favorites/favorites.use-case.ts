import { Injectable } from '@nestjs/common';
import { Favorites } from '../../core/entities';
import { IDataServices } from '../../core/abstracts';

@Injectable()
export class FavoritesUseCases {
  constructor(
    private dataServices: IDataServices,
  ) {}

  getAllFavorites(): Promise<Favorites> {
    return new Promise ((resolve, reject) => {
      resolve(this.dataServices.favorites.getAll()); 
    })
  }

  addFavsTrack(id: string): Promise<Favorites> {
    return new Promise ((resolve, reject) => {
      resolve(this.dataServices.favorites.addTrack(id)); 
    })
  }

  deleteFavsTrack(id: string): Promise<Favorites> {
    return new Promise ((resolve, reject) => {
      resolve(this.dataServices.favorites.deleteTrack(id)); 
    })
  }

  addFavsAlbum(id: string): Promise<Favorites> {
    return new Promise ((resolve, reject) => {
      resolve(this.dataServices.favorites.addAlbum(id)); 
    })
  }

  deleteFavsAlbum(id: string): Promise<Favorites> {
    return new Promise ((resolve, reject) => {
      resolve(this.dataServices.favorites.deleteAlbum(id)); 
    })
  }

  addFavsArtist(id: string): Promise<Favorites> {
    return new Promise ((resolve, reject) => {
      resolve(this.dataServices.favorites.addArtist(id)); 
    })
  }

  deleteFavsArtist(id: string): Promise<Favorites> {
    return new Promise ((resolve, reject) => {
      resolve(this.dataServices.favorites.deleteArtist(id)); 
    })
  }

}