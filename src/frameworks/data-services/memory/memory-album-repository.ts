import { IGenericRepository } from '../../../core';
import { Album} from '../../../core';

export class MemoryAlbumRepository<T> implements IGenericRepository<T> {
    
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
        const album = item as unknown as Album;
        console.log('repository create album: ', album)

        throw new Error('Method not implemented.');
    }
    update(id: string, item: T) {
        const album = item as unknown as Album;
        throw new Error('Method not implemented.');
    }
    delete(id: string) {
        throw new Error('Method not implemented.');
    }
    
}