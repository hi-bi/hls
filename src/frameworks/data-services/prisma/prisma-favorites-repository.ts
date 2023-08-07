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
            .catch((error) => {

            })
        })

        return promGetAll;
    };

    async addArtist (id: string) {
        try {

            await this._service.artist.get(id);

            const result = await this.prisma.favorites.update({
                where: {
                    id: '0',
                },
                data: {
                    artists: {
                        push: id,
                    }
                }
            });

            return result;
        } catch (err) {
                throw new UnprocessableEntityException('Artist with id === artistId does not exist');
            
        }
    } 

    async deleteArtist(artistId: string) {
        try {
            const favorite = await this.prisma.favorites.findUnique({
                where: {
                    id: '0',
                },
            })

            const artists = favorite.artists;

            const result = await this.prisma.favorites.update({
                where: {
                    id: '0',
                },
                data: {
                    artists: {
                        set: artists.filter((id) => id !== artistId)
                    }
                }
            })

            return result;

        } catch (error) {
            
        }
    }


    async addAlbum(id: string) {
        try {

            await this._service.album.get(id);

            const result = await this.prisma.favorites.update({
                where: {
                    id: '0',
                },
                data: {
                    albums: {
                        push: id,
                    }
                }
            });

            return result;
        } catch (err) {
                throw new UnprocessableEntityException('Album with id === albumId does not exist');
            
        }
    };

    async deleteAlbum(albumId: string) {
        try {
            const favorite = await this.prisma.favorites.findUnique({
                where: {
                    id: '0',
                },
            })

            const albums = favorite.albums;

            const result = await this.prisma.favorites.update({
                where: {
                    id: '0',
                },
                data: {
                    albums: {
                        set: albums.filter((id) => id !== albumId)
                    }
                }
            })

            return result;

        } catch (error) {
            
        }
    }

    async addTrack(id: string) {
        try {

            await this._service.track.get(id);

            const result = await this.prisma.favorites.update({
                where: {
                    id: '0',
                },
                data: {
                    tracks: {
                        push: id,
                    }
                }
            });

            return result;
        } catch (err) {
                throw new UnprocessableEntityException('Track with id === trackId does not exist');
            
        }
    };

    async deleteTrack(trackId: string) {
        try {
            const favorite = await this.prisma.favorites.findUnique({
                where: {
                    id: '0',
                },
            })

            const tracks = favorite.tracks;

            const result = await this.prisma.favorites.update({
                where: {
                    id: '0',
                },
                data: {
                    tracks: {
                        set: tracks.filter((id) => id !== trackId)
                    }
                }
            })

            return result;

        } catch (error) {
            
        }
    }

}