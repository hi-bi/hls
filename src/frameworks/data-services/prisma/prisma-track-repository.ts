import { IGenericRepository } from '../../../core';
import { Track } from '../../../core';
import { PrismaDataServices } from './prisma-data-services.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { v4, validate } from 'uuid';

export class PrismaTrackRepository<T> implements IGenericRepository<T> {
    
    private _repository:  Map<string, T>;
    public _service: PrismaDataServices;

    constructor() {
        this._repository = new Map();
    }
    
    getAll(): Promise<T[]> {
        return new Promise ((resolve, reject) => {
            const allRec = Array.from(this._repository.values());
            resolve(allRec);
        })
    }

    get(id: string): Promise<T> {
        return new Promise ((resolve, reject) => {
            const track = this._repository.get(id);

            if (track) resolve(track);
            else reject(new NotFoundException('Track was not found'));
        })
    }

    create(item: T): Promise<T> {
        return new Promise ((resolve, reject) => {
            const track = item as unknown as Track;

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
            this._repository.set(track.id, item);
    
            resolve(item);

        })
    }

    update(id: string, item: T): Promise<T> {
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
                this._repository.set(newTrack.id, item);
        
                resolve(item);

            })
            .catch( error => {
                reject( new NotFoundException('Track with id does not exist'));

            })

        })
    }

    delete(id: string) {
        return new Promise ((resolve, reject) => {
            const res = this._repository.delete(id);
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
            this._repository.forEach((value, key) => {
                const item = value as unknown as Track
                if (item.artistId == id) {
                    item.artistId = null;
                }
            })
//            console.log('Track delete author link: ', id)
            resolve(true);
        })
    }

    deleteLinkToAlbum(id: string): Promise<any> {
        return new Promise ((resolve, reject) => {
            this._repository.forEach((value, key) => {
                const item = value as unknown as Track
                if (item.albumId == id) {
                    item.albumId = null;
                }
            })
//            console.log('Track delete album link: ', id)
            resolve(true);
        })
    }
}