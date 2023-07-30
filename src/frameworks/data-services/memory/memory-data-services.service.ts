import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices, IGenericFavoritesRepository } from '../../../core';
import { Album, Artist, Track, User, Favorites } from '../../../core';
import { MemoryAlbumRepository } from './memory-album-repository';
import { MemoryArtistRepository } from './memory-artist-repository';
import { MemoryTrackRepository } from './memory-track-repository';
import { MemoryUserRepository } from './memory-user-repository';

@Injectable()
export class MemoryDataServices
  implements IDataServices, OnApplicationBootstrap { 
    
    album: MemoryAlbumRepository<Album>;
    artist: MemoryArtistRepository<Artist>;
    track: MemoryTrackRepository<Track>;
    user: MemoryUserRepository<User>;
    favorites: IGenericFavoritesRepository<Favorites>;
    
    constructor(){
        console.log('MemoryDataServices class created')
    }
    
    onApplicationBootstrap() {
        this.album = new MemoryAlbumRepository<Album>;
        this.album._service = this;
        
        this.artist = new MemoryArtistRepository<Artist>;
        this.artist._service = this;
        
        this.track = new MemoryTrackRepository<Track>;
        
        this.user = new MemoryUserRepository<User>;
        
    }
  }