import { IGenericRepository } from '../../../core';
import { Artist } from '../../../core';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class MemoryArtistRepository<T> implements IGenericRepository<T> {
    
    private _repository:  Map<string, T>;

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
            console.log('repository create artist: ', artist)
            
            reject(new NotFoundException('Method not implemented.'))
            
        })
    };

    update(id: string, item: T): Promise<T> {
        return new Promise ((resolve, reject) => {
            const artist = item as unknown as Artist;
            
            reject(new NotFoundException('Method not implemented.'))
            
        })
    };

    delete(id: string) {
        return new Promise ((resolve, reject) => {
            
            reject(new NotFoundException('Method not implemented.'))
            
        })
    };
    
}