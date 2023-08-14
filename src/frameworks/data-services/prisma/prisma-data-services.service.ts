    import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
    import { PrismaAlbumRepository } from './prisma-album-repository';
    import { PrismaArtistRepository } from './prisma-artist-repository';
    import { PrismaTrackRepository } from './prisma-track-repository';
    import { PrismaUserRepository } from './prisma-user-repository';
    import { PrismaFavoritesRepository } from './prisma-favorites-repository';
    import { PrismaService } from './prisma-client.service';
    //import { PrismaClient } from '@prisma/client';

    @Injectable()
    export class PrismaDataServices implements OnApplicationBootstrap { 
    
        album: PrismaAlbumRepository;
        artist: PrismaArtistRepository;
        track: PrismaTrackRepository;
        user: PrismaUserRepository;
        favorites: PrismaFavoritesRepository;
        
        constructor(private prisma: PrismaService){
            console.log('PrismaDataServices class created.')
        }

        async onApplicationBootstrap() {
            this.album = new PrismaAlbumRepository(this.prisma);
            this.album._service = this;
            
            this.artist = new PrismaArtistRepository(this.prisma);
            this.artist._service = this;
            
            this.track = new PrismaTrackRepository(this.prisma);
            this.track._service = this;
            
            this.user = new PrismaUserRepository(this.prisma);
            this.user._service = this;
            
            this.favorites = new PrismaFavoritesRepository(this.prisma);
            this.favorites._service = this;

            console.log('PrismaDataServices class bootstraped.')
        }
       
    }