import { IGenericRepository } from '../../../core';
import { Artist } from '../../../core';
import { MemoryDataServices } from './memory-data-services.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { v4, validate } from 'uuid';

export class MemoryArtistRepository<T> implements IGenericRepository<T> {
    
    private _repository:  Map<string, T>;
    public _service: MemoryDataServices;

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
                resolve(res);
            }
            else reject( new NotFoundException('Artist was not found'));
    
        })
    };
    
}