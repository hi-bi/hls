    import { IGenericFavoritesRepository } from '../../../core';
    import { Favorites } from '../../../core';
    import { Artist } from '../../../core';
    import { Album } from '../../../core';
    import { Track } from '../../../core';
    import { MemoryDataServices } from './memory-data-services.service';
    import { BadRequestException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
    import { v4, validate } from 'uuid';

    export class MemoryFavoritesRepository<T> implements IGenericFavoritesRepository<T> {
        
        private _repositoryArtist:  Map<string, string>;
        private _repositoryAlbum:  Map<string, string>;
        private _repositoryTrack:  Map<string, string>;
        public _service: MemoryDataServices;

        constructor() {
            this._repositoryArtist = new Map();
            this._repositoryAlbum = new Map();
            this._repositoryTrack = new Map();
        };

        
        getAll(): Promise<T> {
            return new Promise ((resolve, reject) => {

                const artists: Artist[] = [];
                const albums: Album[] = [];
                const tracks: Track[] = [];

                this._repositoryArtist.forEach((value, key) => {
                    this._service.artist.get(value)
                    .then( (artist) => {
                        artists.push(artist as unknown as Artist);
                    })
                    .catch((error) => {
                        console.log('getFavArtist: ', value);
                    })
                })

                this._repositoryAlbum.forEach((value, key) => {
                    this._service.album.get(value)
                    .then( (album) => {
                        albums.push(album as unknown as Album);
                    })
                    .catch((error) => {
                        console.log('getFavAlbum: ', value);
                    })
                })

                this._repositoryTrack.forEach((value, key) => {
                    this._service.track.get(value)
                    .then( (track) => {
                        tracks.push(track as unknown as Track);
                    })
                    .catch((error) => {
                        console.log('getFavTrack: ', value);
                    })
                })

                const favorites = {
                    artists,
                    albums,
                    tracks
                }

                resolve(favorites as unknown as any)
            })
        };

        addArtist(id: string): Promise<any> {
            return new Promise ((resolve, reject) => {

                this._service.artist.get(id)
                .then( (artist) => {
                    this._repositoryArtist.set(id, id);
                    resolve(true as unknown as any);
                })
                .catch( (error) => {
                    reject( new UnprocessableEntityException('Artist with id === artistId does not exist'));
                })
            })
        };

        deleteArtist(id: string): Promise<any> {
            return new Promise ((resolve, reject) => {

                const res = this._repositoryArtist.delete(id);
                if (res) {
                    resolve(res)
                }
                else reject( new NotFoundException('Artist is not favorite'));
            })
        };

        addAlbum(id: string): Promise<any> {
            return new Promise ((resolve, reject) => {

                this._service.album.get(id)
                .then( (album) => {
                    this._repositoryAlbum.set(id, id);
                    resolve(true as unknown as any);
                })
                .catch( (error) => {
                    reject( new UnprocessableEntityException('Album with id === artistId does not exist'));
                })
            })
        };

        deleteAlbum(id: string): Promise<any> {
            return new Promise ((resolve, reject) => {

                const res = this._repositoryAlbum.delete(id);
                if (res) {
                    resolve(res)
                }
                else reject( new NotFoundException('Album is not favorite'));
            })
        };

        addTrack(id: string): Promise<any> {
            return new Promise ((resolve, reject) => {
                console.log('addTrack___')
                this._service.track.get(id)
                .then( (track) => {
                    console.log('setFavTrack: ', id, track);
                    this._repositoryTrack.set(id, id);
                    resolve(true as unknown as any);
                })
                .catch( (error) => {
                    reject( new UnprocessableEntityException('Track with id === artistId does not exist'));
                })

            })
            
        };

        deleteTrack(id: string): Promise<any> {
            return new Promise ((resolve, reject) => {

                const res = this._repositoryTrack.delete(id);
                if (res) {
                    resolve(res)
                }
                else reject( new NotFoundException('Track is not favorite'));
            })
        };
        
    }