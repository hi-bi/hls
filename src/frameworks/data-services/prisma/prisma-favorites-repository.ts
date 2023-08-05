import { PrismaDataServices } from './prisma-data-services.service';
import { PrismaService } from './prisma-client.service';
import { Album, Artist, Favorites, Track } from '@prisma/client' 
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class PrismaFavoritesRepository {
    
    public _service: PrismaDataServices;

    constructor(private prisma: PrismaService) {}
    
    getAll(): Promise<Favorites> {

        return new Promise ((resolve, reject) => {

            const artists: Artist[] = [];
            const albums: Album[] = [];
            const tracks: Track[] = [];

            let favorite: Favorites;

            this.prisma.favorites.findUnique({
                where: {
                  id: '0',
                },
            })
            .then((item) => {
                favorite = item;

                favorite.artists.forEach((value, key) => {
                    this._service.artist.get(value)
                    .then( (artist) => {
                        artists.push(artist);
                    })
                    .catch()
                })

                favorite.albums.forEach((value, key) => {
                    this._service.album.get(value)
                    .then( (album) => {
                        albums.push(album);
                    })
                    .catch()
                })

                favorite.tracks.forEach((value, key) => {
                    this._service.track.get(value)
                    .then( (track) => {
                        tracks.push(track);
                    })
                    .catch()
                })

                const favorites = {
                    artists,
                    albums,
                    tracks
                }

                resolve(favorites as unknown as any)
            })

        })
    };

    addArtist(id: string): Promise<any> {
        return new Promise ((resolve, reject) => {

            this._service.artist.get(id)
            .then( (artist) => {
                this.prisma.favorites.update({
                    where: {
                        id: '0',
                    },
                    data: {
                        artists: {
                            push: id,
                        }
                    }
                })

                //this._repositoryArtist.set(id, id);
                resolve(true);
            })
            .catch( (error) => {
                reject( new UnprocessableEntityException('Artist with id === artistId does not exist'));
            })
        })
    };

    deleteArtist(id: string): Promise<any> {
        return new Promise ((resolve, reject) => {
            
            let favorite: Favorites;
            
            this.prisma.favorites.findUnique({
                where: {
                    id: '0',
                },
            })
            .then((item) => {
                favorite = item;

                const artists = favorite.artists;
                const index = artists.indexOf(id);
                if (index >= 0) {
                    artists.splice(index, 1);
    
                    this.prisma.favorites.update({
                        where: {
                            id: '0',
                        },
                        data: {
                            artists: artists,
                        }
                    })
                    .then((res) => {
                        resolve(true);
                    })
                    .catch((err) => {
                        new NotFoundException('Artist is not favorite')
                    })
    
                } else reject( new NotFoundException('Artist is not favorite'));

            })
            .catch((err) => {
                reject( new NotFoundException('Artist is not favorite'));
            })
        })
    };

    addAlbum(id: string): Promise<any> {
        return new Promise ((resolve, reject) => {

            this._service.album.get(id)
            .then( (album) => {
                this.prisma.favorites.update({
                    where: {
                        id: '0',
                    },
                    data: {
                        albums: {
                            push: id,
                        }
                    }
                })

                resolve(true);
            })
            .catch( (error) => {
                reject( new UnprocessableEntityException('Albumt with id === albumId does not exist'));
            })
        })
    };

    deleteAlbum(id: string): Promise<any> {
        return new Promise ((resolve, reject) => {
            
            let favorite: Favorites;
            
            this.prisma.favorites.findUnique({
                where: {
                    id: '0',
                },
            })
            .then((item) => {
                favorite = item;

                const albums = favorite.albums;
                const index = albums.indexOf(id);
                if (index >= 0) {
                    albums.splice(index, 1);
    
                    this.prisma.favorites.update({
                        where: {
                            id: '0',
                        },
                        data: {
                            albums: albums,
                        }
                    })
                    .then((res) => {
                        resolve(true);
                    })
                    .catch((err) => {
                        new NotFoundException('Albums is not favorite')
                    })
    
                } else reject( new NotFoundException('Albums is not favorite'));

            })
            .catch((err) => {
                reject( new NotFoundException('Albums is not favorite'));
            })
        })
    };

    addTrack(id: string): Promise<any> {
        return new Promise ((resolve, reject) => {

            this._service.track.get(id)
            .then( (track) => {
                this.prisma.favorites.update({
                    where: {
                        id: '0',
                    },
                    data: {
                        tracks: {
                            push: id,
                        }
                    }
                })

                resolve(true);
            })
            .catch( (error) => {
                reject( new UnprocessableEntityException('Track with id === albumId does not exist'));
            })
        })
        
    };

    deleteTrack(id: string): Promise<any> {
        return new Promise ((resolve, reject) => {
            
            let favorite: Favorites;
            
            this.prisma.favorites.findUnique({
                where: {
                    id: '0',
                },
            })
            .then((item) => {
                favorite = item;

                const tracks = favorite.tracks;
                const index = tracks.indexOf(id);
                if (index >= 0) {
                    tracks.splice(index, 1);
    
                    this.prisma.favorites.update({
                        where: {
                            id: '0',
                        },
                        data: {
                            tracks: tracks,
                        }
                    })
                    .then((res) => {
                        resolve(true);
                    })
                    .catch((err) => {
                        new NotFoundException('Tracks is not favorite')
                    })
    
                } else reject( new NotFoundException('Tracks is not favorite'));

            })
            .catch((err) => {
                reject( new NotFoundException('Tracks is not favorite'));
            })
        })
    };
    
}