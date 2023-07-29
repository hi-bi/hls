import { IGenericRepository } from '../../../core';
import { User } from '../../../core';

export class MemoryUserRepository<T> implements IGenericRepository<T> {
    
    private _repository:  Map<string, T>;

    constructor() {
        this._repository = new Map();
    }
    
    getAll(): Promise<T[]> {
        console.log('user getAll(): ');
        const allRec = Array.from(this._repository.values());
        return Promise.resolve(allRec);
//        throw new Error('Method not implemented.');
    }
    get(id: string): Promise<T> {

        throw new Error('Method not implemented.');
    }
    create(item: T): Promise<T> {
        const user = item as unknown as User;
        console.log('repository create user: ', user)

        throw new Error('Method not implemented.');
    }
    update(id: string, item: T) {
        const user = item as unknown as User;
        throw new Error('Method not implemented.');
    }
    delete(id: string) {
        throw new Error('Method not implemented.');
    }
    
}