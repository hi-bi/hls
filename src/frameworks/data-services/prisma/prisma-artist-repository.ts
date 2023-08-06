import { PrismaDataServices } from './prisma-data-services.service';
import { PrismaService } from './prisma-client.service';
import { Artist } from '@prisma/client' 
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class PrismaArtistRepository {
    
    public _service: PrismaDataServices; 

    constructor(private prisma: PrismaService) {};
    
    getAll(): Promise<Artist[]> {
        return new Promise ((resolve, reject) => {
            this.prisma.artist.findMany()
            .then((res) => {
                resolve(res);
            })            
        })
    };

    get(id: string): Promise<Artist> {
        return new Promise ((resolve, reject) => {
            this.prisma.artist.findUnique({
                where: {
                    id: id,
                }
            })
            .then((artist) => {
                if (artist != null) {
                    resolve(artist);
                } else {
                    reject(new NotFoundException('Artist was not found'));
                }
            })
        })
    };

    create(artist: Artist): Promise<Artist> {
        return new Promise ((resolve, reject) => {
            const artistId = v4();

            this.prisma.artist.create( {
                data: {
                    id: artistId,
                    name: artist.name,
                    grammy: artist.grammy
                } 
            })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
        })
    };

    update(id: string, item: Artist): Promise<Artist> {
        return new Promise ((resolve, reject) => {
            this.get(id)
            .then( (artist) => {

                item.id = artist.id

                this.prisma.artist.updateMany({
                    where: {
                        id: id,
                    },
                    data: {
                        name: item.name,
                        grammy: item.grammy
                    }
                }) //.set(newArtist.id, item);
                .then((res) => {
                    resolve(item);
                })
                .catch((err) => {
                    reject(new NotFoundException('Artist with id does not exist'));
                })
            })
            .catch( error => {
                reject( new NotFoundException('Artist with id does not exist'));

            })
        })
    };

    delete(id: string) {
        return new Promise ((resolve, reject) => {
            let result = false;
            this.prisma.artist.delete({
                where: {
                    id: id,
                }
            }) //delete(id);
            .then((artist) => {
                console.log('Artist deleted: ', artist);
                result = true;

                this._service.album.deleteLinkToArtist(id)
                .then( (res) => {
                    const next = res;
                    console.log('Artist delete album reference: ', id, res)
                })

                this._service.track.deleteLinkToArtist(id)
                .then( (res) => {
                    const next = res;
//                    console.log('Artist delete track reference: ', id, res)
                })

                this._service.favorites.deleteArtist(id)
                .then( (artist) => {
                    const next = result;
//                    console.log('delete artist from favorites: ', id, artist)
                })
                .catch( (error) => {
                    const next = result;
//                    console.log('not found artist in favorites: ', id)
                })

                resolve(result);

            })
            .catch((err) => {
                reject( new NotFoundException('Artist was not found'))
            }) 
    
        })
    };
    
}