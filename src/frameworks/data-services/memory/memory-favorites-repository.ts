import { IGenericFavoritesRepository } from '../../../core';
import { Favorites } from '../../../core';
import { MemoryDataServices } from './memory-data-services.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class MemoryFavoritesRepository<T> implements IGenericFavoritesRepository<T> {
    
    private _repositoryArtist:  Map<string, T>;
    private _repositoryAlbum:  Map<string, T>;
    private _repositoryTrack:  Map<string, T>;
    public _service: MemoryDataServices;

    constructor() {
        this._repositoryArtist = new Map();
        this._repositoryAlbum = new Map();
        this._repositoryTrack = new Map();
    };

    
    
    getAll(): Promise<T> {
        return new Promise ((resolve, reject) => {
//            const allRec = Array.from(this._repository.values());
//            resolve(allRec);
        })
    };

    addArtist(id: string) {
        
    }

    deleteArtist(id: string) {
        return new Promise ((resolve, reject) => {
            const res = this._repositoryArtist.delete(id);
            if (res) {
                resolve(res);
            }
            else reject( new NotFoundException('Artist was not found'));
        })
    }

    addAlbum(id: string) {
        
    }

    deleteAlbum(id: string) {
        return new Promise ((resolve, reject) => {
            const res = this._repositoryAlbum.delete(id);
            if (res) {
                resolve(res);
            }
            else reject( new NotFoundException('Album was not found'));
        })
    }

    addTrack(id: string) {
        
    }

    deleteTrack(id: string) {
        return new Promise ((resolve, reject) => {
            const res = this._repositoryTrack.delete(id);
            if (res) {
                resolve(res);
            }
            else reject( new NotFoundException('Track was not found'));
        })
    }
    
}