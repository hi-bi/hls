import { IGenericRepository } from '../../../core';
import { Artist } from '../../../core';

export class MemoryArtistRepository<T> implements IGenericRepository<T> {
    
    private _repository:  Map<string, T>;

    constructor() {
        this._repository = new Map();
    }
    
    getAll(): Promise<T[]> {
        const allRec = Array.from(this._repository.values());
        return Promise.resolve(allRec);
//        throw new Error('Method not implemented.');
    }
    get(id: string): Promise<T> {

        throw new Error('Method not implemented.');
    }
    create(item: T): Promise<T> {
        const artist = item as unknown as Artist;
        console.log('repository create artist: ', artist)

        throw new Error('Method not implemented.');
    }
    update(id: string, item: T) {
        const artist = item as unknown as Artist;
        throw new Error('Method not implemented.');
    }
    delete(id: string) {
        throw new Error('Method not implemented.');
    }
    
}