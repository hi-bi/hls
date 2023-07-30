import { IGenericRepository } from '../../../core';
import { User } from '../../../core';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class MemoryUserRepository<T> implements IGenericRepository<T> {
    
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
            const user = item as unknown as User;
            console.log('repository create artist: ', user)
            
            reject(new NotFoundException('Method not implemented.'))
            
        })
    }
    update(id: string, item: T): Promise<T> {
        return new Promise ((resolve, reject) => {
            const user = item as unknown as User;
            
            reject(new NotFoundException('Method not implemented.'))
            
        })
    }
    delete(id: string) {
        return new Promise ((resolve, reject) => {
            
            reject(new NotFoundException('Method not implemented.'))
            
        })
    }
    
}