import { IGenericRepository } from '../../../core';
import { Artist } from '../../../core';
import { PrismaDataServices } from './prisma-data-services.service';
import { NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

export class PrismaArtistRepository<T> implements IGenericRepository<T> {
    
    private _repository:  Map<string, T>;
    public _service: PrismaDataServices;

    constructor() {
        this._repository = new Map();
    };
    
    getAll(): Promise<T[]> {
        return new Promise ((resolve, reject) => {
            const allRec = Array.from(this._repository.values());
            resolve(allRec);
        })
    };

    get(id: string): Promise<T> {
        return new Promise ((resolve, reject) => {
            const artist = this._repository.get(id);

            if (artist) resolve(artist);
            else reject(new NotFoundException('Artist was not found'));
        })
    };

    create(item: T): Promise<T> {
        return new Promise ((resolve, reject) => {
            const artist = item as unknown as Artist;

            artist.id = v4();
            this._repository.set(artist.id, item);
    
            resolve(item);
        })
    };

    update(id: string, item: T): Promise<T> {
        return new Promise ((resolve, reject) => {
            this.get(id)
            .then( artist => {

                const newArtist = item as unknown as Artist;
                newArtist.id = id;

                this._repository.set(newArtist.id, item);
        
                resolve(item);

            })
            .catch( error => {
                reject( new NotFoundException('Artist with id does not exist'));

            })
        })
    };

    delete(id: string) {
        return new Promise ((resolve, reject) => {
            const res = this._repository.delete(id);
            if (res) {

                this._service.track.deleteLinkToArtist(id)
                .then( (res) => {
                    const next = res;
//                    console.log('Artist delete track reference: ', id, res)
                })

                this._service.album.deleteLinkToArtist(id)
                .then( (res) => {
                    const next = res;
//                    console.log('Artist delete album reference: ', id, res)
                })

                this._service.favorites.deleteArtist(id)
                .then( (artist) => {
                    const next = res;
//                    console.log('delete artist from favorites: ', id, artist)
                })
                .catch( (error) => {
                    const next = res;
//                    console.log('not found artist in favorites: ', id)
                })

                resolve(res);
            }
            else reject( new NotFoundException('Artist was not found'));
    
        })
    };
    
}