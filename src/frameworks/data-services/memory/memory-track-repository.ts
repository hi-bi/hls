import { IGenericRepository } from '../../../core';
import { Track } from '../../../core';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class MemoryTrackRepository<T> implements IGenericRepository<T> {
    
    private _repository:  Map<string, T>;

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
            
            reject(new NotFoundException('Method not implemented.'))
            
        })
    }
    create(item: T): Promise<T> {
        return new Promise ((resolve, reject) => {
            const track = item as unknown as Track;
            console.log('repository create artist: ', track)
            
            reject(new NotFoundException('Method not implemented.'))
            
        })
    }
    update(id: string, item: T): Promise<T> {
        return new Promise ((resolve, reject) => {
            const track = item as unknown as Track;
            
            reject(new NotFoundException('Method not implemented.'))
            
        })
    }
    delete(id: string) {
        return new Promise ((resolve, reject) => {
            
            reject(new NotFoundException('Method not implemented.'))
            
        })
    }

}