import { IGenericRepository } from '../../../core';
import { Track } from '../../../core';
import { MemoryDataServices } from './memory-data-services.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { v4, validate } from 'uuid';

export class MemoryTrackRepository<T> implements IGenericRepository<T> {
    
    private _repository:  Map<string, T>;
    public _service: MemoryDataServices;

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

            repArtist.get(artistId)
            .then( () => {
                repAlbum.get(albumId)
                .then ( () => {
                    track.id = v4();
                    this._repository.set(track.id, item);
            
                    resolve(item);
                })
                .catch( error => {
                    reject( new BadRequestException('Album was not found'));
                })


            })
            .catch( error => {
                reject( new BadRequestException('Artist was not found'));
            }) 

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
    
                repArtist.get(artistId)
                .then( () => {
                    repAlbum.get(albumId)
                    .then ( () => {
                        newTrack.id = id;
                        this._repository.set(newTrack.id, item);
                
                        resolve(item);
                    })
                    .catch( error => {
                        reject( new BadRequestException('Album was not found'));
                    })
    
    
                })
                .catch( error => {
                    reject( new BadRequestException('Artist was not found'));
                }) 

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
                resolve(res);
            }
            else reject( new NotFoundException('Track was not found'));
    
        })
    }

}