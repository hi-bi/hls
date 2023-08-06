import { PrismaDataServices } from './prisma-data-services.service';
import { PrismaService } from './prisma-client.service';
import { Album, Artist, Favorites, Track } from '@prisma/client' 
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class PrismaFavoritesRepository {
    
    public _service: PrismaDataServices;

    constructor(private prisma: PrismaService) {}
    
    getAll(): Promise<Favorites> {

        const promGetAll : Promise<Favorites> = new Promise ((resolve, reject) => {
            
            let artists: Artist[] = [];
            let albums: Album[] = [];
            let tracks: Track[] = [];

            let favorities = {
                artists,
                albums,
                tracks
            }

            let favorite: Favorites;

            this.prisma.favorites.findUnique({
                where: {
                  id: '0',
                },
            })
            .then((item) => {
                favorite = item;

                let promises = [];
                favorite.artists.forEach((value, key) => {
                    promises.push(this._service.artist.get(value));
                })

                const resultArtist = Promise.all(promises) as unknown as Artist[]; 

                return resultArtist;
            })
            .then((result) => {

                favorities.artists = result;

                let promises = [];

                favorite.albums.forEach((value, key) => {
                    promises.push(this._service.album.get(value));
                })

                const resultAlbum = Promise.all(promises) as unknown as Album[]; 

                return resultAlbum
            })
            .then((result) => {

                favorities.albums = result;

                let promises = [];

                favorite.tracks.forEach((value, key) => {
                    promises.push(this._service.track.get(value));
                })

                const resultTrack = Promise.all(promises) as unknown as Track[]; 

                return resultTrack
            })
            .then((result) => {

                favorities.tracks = result;

                resolve(
                    favorities as unknown as any
                 )

            })

        })

        return promGetAll;
    };

    addArtist(id: string): Promise<any> {
        return new Promise ((resolve, reject) => {
            console.log('Favorities Artist add: ', id);
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
                .then((res) => {
                    resolve(true);
                })
                .catch((err) => {

                    reject(err);
                })

                //this._repositoryArtist.set(id, id);
            })
            .catch( (err) => {
                console.log('Favorities Artist add error: ', err);
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
                .then((res) => {
                    resolve(true);
                })
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
                .then((res) => {
                    resolve(true);
                })

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