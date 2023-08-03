import { PrismaClient } from '@prisma/client';

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices } from '../../../core';
import { Album, Artist, Track, User, Favorites } from '../../../core';
import { PrismaAlbumRepository } from './prisma-album-repository';
import { PrismaArtistRepository } from './prisma-artist-repository';
import { PrismaTrackRepository } from './prisma-track-repository';
import { PrismaUserRepository } from './prisma-user-repository';
import { PrismaFavoritesRepository } from './prisma-favorites-repository';

@Injectable()
export class PrismaDataServices
  implements IDataServices, OnApplicationBootstrap { 

    prisma = new PrismaClient();

    album: PrismaAlbumRepository<Album>;
    artist: PrismaArtistRepository<Artist>;
    track: PrismaTrackRepository<Track>;
    user: PrismaUserRepository<User>;
    favorites: PrismaFavoritesRepository<Favorites>;
    
    constructor(){
        console.log('MemoryDataServices class created')
    }
    
    onApplicationBootstrap() {
        this.album = new PrismaAlbumRepository<Album>;
        this.album._service = this;
        
        this.artist = new PrismaArtistRepository<Artist>;
        this.artist._service = this;
        
        this.track = new PrismaTrackRepository<Track>;
        this.track._service = this;
        
        this.user = new PrismaUserRepository<User>;
        this.user._service = this;
        
        this.favorites = new PrismaFavoritesRepository<Favorites>;
        this.favorites._service = this;

      }
  }