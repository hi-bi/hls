import { PrismaDataServices } from './prisma-data-services.service';
import { PrismaService } from './prisma-client.service';
import { Album } from '@prisma/client' 
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4, validate } from 'uuid';

@Injectable()
export class PrismaAlbumRepository {
    
    public _service: PrismaDataServices;

    constructor(private prisma: PrismaService) {}
    
    async getAll(): Promise<Album[]> {

        return new Promise ((resolve, reject) => {
            this.prisma.album.findMany()
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
        })

    };

    get(id: string): Promise<Album> {
        return new Promise ((resolve, reject) => {
            this.prisma.album.findUnique({
                where: {
                    id: id,
                }
            })
            .then((album) => {
                if (album != null) {
                    resolve(album);
                } else {
                    reject(new NotFoundException('Album was not found'));
                }
            })
        })
    };

    create(album: Album): Promise<Album> {
        return new Promise ((resolve, reject) => {
            console.log('Album create: ', album);

            const repArtist = this._service.artist;
            
            const artistId = album.artistId;
            if (artistId === undefined) {
                reject( new BadRequestException('artistId should not be empty'));
            } else {
                if (artistId != null) {
                    if (!validate(artistId)) {
                        reject( new BadRequestException('artistId is not uuid'));
                    } else {
                        repArtist.get(artistId)
                        .then( (artist) => {
                            if (artist != null) {
                                album.id = v4();
                                this.prisma.album.create({
                                    data: {
                                        id: album.id,
                                        name: album.name,
                                        year: album.year,
                                        artistId: album.artistId,
                                    }
                                })
                                .then((res) => {
                                    //resolve(item);
                                    console.log('create album: ', res);
                                    resolve(res);
                                })
                                .catch((err) => {
                                    reject( err);
                                })
                                //this._repository.set(album.id, item);
    
                            } else {
                                reject( new BadRequestException('Artist was not found'));
                            }
                    
                        })
                        .catch( error => {
                            reject( new BadRequestException('Artist was not found'));
                        }) 
        
                    } 
                } else {
                    album.id = v4();
                    this.prisma.album.create({
                        data: {
                            id: album.id,
                            name: album.name,
                            year: album.year,
                            artistId: album.artistId,
                        }
                    })
                    .then((res) => {
                        console.log('Album created: ', res);
                        resolve(res);
                    })
                    .catch((err) => {
                        console.log('Album creat err: ', err);
                        reject( err);
                    })
                    //this._repository.set(album.id, item);
                }
    
            }  
        })
    };

    update(id: string, item: Album): Promise<Album> {
        return new Promise ((resolve, reject) => {
            this.get(id)
            .then( album => {

                const newAlbum = item;
                const repArtist = this._service.artist;

                const artistId = newAlbum.artistId;
                if (artistId === undefined) {
                    reject( new BadRequestException('artistId should not be empty'));
                } else {
                    if (artistId != null) {
                        if (!validate(artistId)) {
                            reject( new BadRequestException('artistId is not uuid'));
                        } else {
                            repArtist.get(artistId)
                            .then( () => {
                                newAlbum.id = id;
                                this.prisma.album.update({
                                    where: {
                                        id: id,
                                    },
                                    data: {
                                        id: album.id,
                                        name: album.name,
                                        year: album.year,
                                        artistId: album.artistId,
                                    }
                                })
                                .then((res) => {
                                    resolve(item);
                                })
                                .catch((err) => {
                                    reject( new BadRequestException('Artist was not found'));
                                })
                                //this._repository.set(newAlbum.id, item);
                        
                            })
                            .catch( error => {
                                reject( new BadRequestException('Artist was not found'));
                            }) 
            
                        } 
                    } else {
                        newAlbum.id = id;
                        this.prisma.album.update({
                            where: {
                                id: id,
                            },
                            data: {
                                id: album.id,
                                name: album.name,
                                year: album.year,
                                artistId: album.artistId,
                            }
                        })
                        .then((res) => {
                            resolve(item);
                        })
                        .catch((err) => {
                            reject( new NotFoundException('Album with id does not exist'));
                        })
                        //this._repository.set(newAlbum.id, item);
                    }
                }  
            })
            .catch( error => {
                reject( new NotFoundException('Album with id does not exist'));

            })
        })
    };

    delete1(id: string) {
        return new Promise ((resolve, reject) => {
            let result = false;
            this.prisma.album.delete({
                where: {
                    id: id,
                },
            })
            .then((res) => {
                result = true;

                this._service.track.deleteLinkToAlbum(id)
                .then( (res) => {
                    const next = res;
//                    console.log('Album delete track reference: ', id, res)
                })
                .catch((err) => {
                    const next = err;
                })

                this._service.favorites.deleteAlbum(id)
                .then( (album) => {
                    resolve(result);
                })
                .catch( (error) => {
                    resolve(result);
                })

                resolve(result);

            })
            .catch((err) => {

                reject( new NotFoundException('Album was not found'));

                result = false;
            })
            //const res = this._repository.delete(id);
    
        })
    };

    deleteLinkToArtist(id: string): Promise<any> {
        return new Promise ((resolve, reject) => {
            this.prisma.album.updateMany({
                where: {
                    artistId: id,
                },
                data: {
                    artistId: null,
                }
            })
            .then((album) => {
                resolve(true);
            })
            .catch((err) => {
                resolve(false);
            })

//            console.log('Album delete author link: ', id)
        })
    };
    
}