import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices } from '../../../core';
import { Album, Artist, Track, User, Favorites } from '../../../core';
import { MemoryAlbumRepository } from './memory-album-repository';
import { MemoryArtistRepository } from './memory-artist-repository';
import { MemoryTrackRepository } from './memory-track-repository';
import { MemoryUserRepository } from './memory-user-repository';
import { MemoryFavoritesRepository } from './memory-favorites-repository';

@Injectable()
export class MemoryDataServices
  implements IDataServices, OnApplicationBootstrap { 
    
    album: MemoryAlbumRepository<Album>;
    artist: MemoryArtistRepository<Artist>;
    track: MemoryTrackRepository<Track>;
    user: MemoryUserRepository<User>;
    favorites: MemoryFavoritesRepository<Favorites>;
    
    constructor(){
        console.log('MemoryDataServices class created')
    }
    
    onApplicationBootstrap() {
        this.album = new MemoryAlbumRepository<Album>;
        this.album._service = this;
        
        this.artist = new MemoryArtistRepository<Artist>;
        this.artist._service = this;
        
        this.track = new MemoryTrackRepository<Track>;
        this.track._service = this;
        
        this.user = new MemoryUserRepository<User>;
        this.user._service = this;
        
        this.favorites = new MemoryFavoritesRepository<Favorites>;
        this.favorites._service = this;

      }
  }