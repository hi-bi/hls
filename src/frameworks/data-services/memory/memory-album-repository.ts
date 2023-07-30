import { IGenericRepository } from '../../../core';
import { Album} from '../../../core';
import { MemoryDataServices } from './memory-data-services.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { v4, validate } from 'uuid';

export class MemoryAlbumRepository<T> implements IGenericRepository<T> {
    
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
            const album = this._repository.get(id);

            if (album) resolve(album);
            else reject(new NotFoundException('Album was not found'));
        })
    }
    create(item: T): Promise<T> {
        return new Promise ((resolve, reject) => {
            const album = item as unknown as Album;

            const repArtist = this._service.artist;
            
            const artistId = album.artistId;
            if (artistId === undefined) {
                reject( new BadRequestException('artistId should not be empty'));
            } else {
                if (artistId != null) {
                    if (!validate(artistId)) {
                        reject( new BadRequestException('artistId is not uuid'));
                    } else {
                        repArtist.get(artistId)
                        .then( () => {
                            album.id = v4();
                            this._repository.set(album.id, item);
                    
                            console.log('result: ', album, item)
                            resolve(item);
                        })
                        .catch( error => {
                            reject( new BadRequestException('Artist was not found'));
                        }) 
        
                    } 
                } else {
                    album.id = v4();
                    this._repository.set(album.id, item);
            
                    console.log('result: ', album, item)
                    resolve(item);
                }
    
            }  
        })
    }
    update(id: string, item: T): Promise<T> {
        return new Promise ((resolve, reject) => {
            this.get(id)
            .then( album => {

                const newAlbum = item as unknown as Album;
                const repArtist = this._service.artist;

                const artistId = newAlbum.artistId;
                if (artistId === undefined) {
                    reject( new BadRequestException('artistId should not be empty'));
                } else {
                    if (artistId != null) {
                        if (!validate(artistId)) {
                            reject( new BadRequestException('artistId is not uuid'));
                        } else {
                            repArtist.get(artistId)
                            .then( () => {
                                newAlbum.id = v4();
                                this._repository.set(newAlbum.id, item);
                        
                                console.log('result: ', album, item)
                                resolve(item);
                            })
                            .catch( error => {
                                reject( new BadRequestException('Artist was not found'));
                            }) 
            
                        } 
                    } else {
                        newAlbum.id = id;
                        this._repository.set(newAlbum.id, item);
                
                        console.log('result: ', newAlbum, album)
                        resolve(item);
                    }
                }  
//                console.log('Album exists')

//                resolve(item);

            })
            .catch( error => {
                console.log('Album not exists')
                reject( new NotFoundException('Album with id does not exist'));

            })
    
        })
    }
    delete(id: string) {
        return new Promise ((resolve, reject) => {
            const res = this._repository.delete(id);
            if (res) {
                resolve(res);
            }
            else reject( new NotFoundException('Album was not found'));
    
        })
    }
    
}