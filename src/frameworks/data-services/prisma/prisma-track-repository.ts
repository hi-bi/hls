import { PrismaDataServices } from './prisma-data-services.service';
import { PrismaService } from './prisma-client.service';
import { Track } from '@prisma/client' 
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { v4, validate } from 'uuid';

export class PrismaTrackRepository {
    
    public _service: PrismaDataServices;

    constructor(private prisma: PrismaService) {}
    
    getAll(): Promise<Track[]> {
        return new Promise ((resolve, reject) => {
            const allRec =  this.prisma.track.findMany()
            resolve(allRec);
        })
    }

    get(id: string): Promise<Track> {
        return new Promise ((resolve, reject) => {
            const track = this.prisma.track.findUnique({
                where: {
                    id: id,
                }
            });

            if (track) resolve(track);
            else reject(new NotFoundException('Track was not found'));
        })
    }

    create(item: Track): Promise<Track> {
        return new Promise ((resolve, reject) => {
            const track = item;

            let okArtistId = false;
            const artistId = track.artistId;

            if (artistId === undefined) {
            } else {
                if (artistId != null) {
                    if (validate(artistId)) {
                        okArtistId = true
                    }
                } else {
                    okArtistId = true
                }
            }

            if (!okArtistId) {
                reject(new BadRequestException('artistId is wrong'))
            }

            let okAlbumId = false;
            const albumId = track.albumId;

            if (albumId === undefined) {
            } else {
                if (albumId != null) {
                    if (validate(albumId)) {
                        okAlbumId = true
                    }
                } else {
                    okAlbumId = true
                }
            }

            if (!okAlbumId) {
                reject(new BadRequestException('albumId is wrong'))
            }

            const repArtist = this._service.artist;
            const repAlbum = this._service.album;

            if (artistId != null) {
                repArtist.get(artistId)
                .then()    
                .catch( error => {
                    reject( new BadRequestException('Artist was not found'));
                }) 
            }

            if (albumId != null) {
                repAlbum.get(albumId)
                .then()    
                .catch( error => {
                    reject( new BadRequestException('Album was not found'));
                }) 
            }

            track.id = v4();
            this.prisma.track.create({
                data: {

                    id: track.id,
                    name: track.name,
                    artistId: track.artistId,
                    albumId: track.albumId,
                    duration: track.duration,
                }
            })

            resolve(item);

        })
    }

    update(id: string, item: Track): Promise<Track> {
        return new Promise ((resolve, reject) => {
            this.get(id)
            .then( track => {

                const newTrack = item as unknown as Track;

                let okArtistId = false;
                const artistId = newTrack.artistId;
    
                if (artistId === undefined) {
                } else {
                    if (artistId != null) {
                        if (validate(artistId)) {
                            okArtistId = true
                        }
                    } else {
                        okArtistId = true
                    }
                }
    
                if (!okArtistId) {
                    reject(new BadRequestException('artistId is wrong'))
                }
    
                let okAlbumId = false;
                const albumId = newTrack.albumId;
    
                if (albumId === undefined) {
                } else {
                    if (albumId != null) {
                        if (validate(albumId)) {
                            okAlbumId = true
                        }
                    } else {
                        okAlbumId = true
                    }
                }
    
                if (!okAlbumId) {
                    reject(new BadRequestException('albumId is wrong'))
                }
    
                const repArtist = this._service.artist;
                const repAlbum = this._service.album;

                if (artistId != null) {
                    repArtist.get(artistId)
                    .then()    
                    .catch( error => {
                        reject( new BadRequestException('Artist was not found'));
                    }) 
                }
    
                if (albumId != null) {
                    repAlbum.get(albumId)
                    .then()    
                    .catch( error => {
                        reject( new BadRequestException('Album was not found'));
                    }) 
                }
    
                newTrack.id = id;
                this.prisma.track.update({
                    where: {
                        id: id,
                    },
                    data: {
                        id: track.id,
                        name: track.name,
                        artistId: track.artistId,
                        albumId: track.albumId,
                        duration: track.duration,
                    }
                })

//                this._repository.set(newTrack.id, item);
                resolve(item);

            })
            .catch( error => {
                reject( new NotFoundException('Track with id does not exist'));

            })

        })
    }

    delete(id: string) {
        return new Promise ((resolve, reject) => {
            const res = this.prisma.album.delete({
                where: {
                    id: id,
                },
            })

            //const res = this._repository.delete(id);
            if (res) {
                this._service.favorites.deleteTrack(id)
                .then( (track) => {
//                    console.log('delete track from favorites: ', id, track)
                    resolve(res);
                })
                .catch( (error) => {
//                    console.log('not found track in favorites: ', id, error)
                    resolve(res);
                })
            }
            else reject( new NotFoundException('Track was not found'));
    
        })
    }

    deleteLinkToArtist(id: string): Promise<any> {
        return new Promise ((resolve, reject) => {
            this.prisma.track.updateMany({
                where: {
                    artistId: id,
                },
                data: {
                    artistId: null,
                }
            })

//            console.log('Track delete author link: ', id)
            resolve(true);
        })
    }

    deleteLinkToAlbum(id: string): Promise<any> {
        return new Promise ((resolve, reject) => {
            this.prisma.track.updateMany({
                where: {
                    albumId: id,
                },
                data: {
                    albumId: null,
                }
            })

//            console.log('Track delete album link: ', id)
            resolve(true);
        })
    }
}