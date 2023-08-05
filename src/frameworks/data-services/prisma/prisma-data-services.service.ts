    import { Injectable, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
    import { Track, User, Favorites } from '../../../core';
    import { PrismaAlbumRepository } from './prisma-album-repository';
    import { PrismaArtistRepository } from './prisma-artist-repository';
    import { PrismaTrackRepository } from './prisma-track-repository';
    import { PrismaUserRepository } from './prisma-user-repository';
    import { PrismaFavoritesRepository } from './prisma-favorites-repository';
    import { PrismaService } from './prisma-client.service';
    //import { PrismaClient } from '@prisma/client';

    @Injectable()
    export class PrismaDataServices implements OnApplicationBootstrap { 
    //    implements IDataServices, OnModuleInit { 

        prisma: PrismaService; 

        album: PrismaAlbumRepository;
        artist: PrismaArtistRepository;
        track: PrismaTrackRepository<Track>;
        user: PrismaUserRepository<User>;
        favorites: PrismaFavoritesRepository<Favorites>;
        
        constructor(){
            console.log('PrismaDataServices class created: ', this.prisma)
        }

        async onApplicationBootstrap() {
            this.prisma = new PrismaService;
            console.log('PrismaDataServices class bootstrap: ', this.prisma)

            this.album = new PrismaAlbumRepository(this.prisma);
            this.album._service = this;
            
            this.artist = new PrismaArtistRepository(this.prisma);
            this.artist._service = this;
            
            this.track = new PrismaTrackRepository<Track>;
            this.track._service = this;
            
            this.user = new PrismaUserRepository<User>;
            this.user._service = this;
            
            this.favorites = new PrismaFavoritesRepository<Favorites>;
            this.favorites._service = this;

        }
       
    }