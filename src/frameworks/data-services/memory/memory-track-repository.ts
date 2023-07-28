import { IGenericRepository } from '../../../core';
import { Track } from '../../../core';

export class MemoryTrackRepository<T> implements IGenericRepository<T> {
    
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

        const track = item as unknown as Track;
        console.log('repository create track: ', track)
        
        throw new Error('Method not implemented.');
    }
    update(id: string, item: T) {
        throw new Error('Method not implemented.');
    }
    delete(id: string) {
        throw new Error('Method not implemented.');
    }

}