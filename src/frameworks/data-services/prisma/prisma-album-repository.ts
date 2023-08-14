import { PrismaDataServices } from './prisma-data-services.service';
import { PrismaService } from './prisma-client.service';
import { Album } from '@prisma/client' 
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4, validate } from 'uuid';

@Injectable()
export class PrismaAlbumRepository {
    
    public _service: PrismaDataServices;

    constructor(private prisma: PrismaService) {}
    
    async getAll() {
        try {
            const albums = await  this.prisma.album.findMany();

            return albums
        } catch (error) {
            
        }
    }

    async get(id: string) {
        try {
            const album = await this.prisma.album.findUnique({
                where: {
                    id: id,
                }
            })
            if (album == null) {
                throw new NotFoundException('Album was not found');
            }

            return album;

        } catch (error) {
            throw new NotFoundException('Album was not found');
        }
    }

    async create(album: Album) {
        try {
            const repArtist = this._service.artist;
            const artistId = album.artistId;
            
            if (artistId === undefined) {
                throw new BadRequestException('artistId should not be empty');
            }

            if (artistId != null) {
                if (!validate(artistId)) {
                    throw new BadRequestException('artistId is not uuid');
                }

                const artist = await repArtist.get(artistId);        
            }
            
            album.id = v4();
            const newAlbum = await this.prisma.album.create({
                data: {
                    id: album.id,
                    name: album.name,
                    year: album.year,
                    artistId: album.artistId,
                }
            })

            return newAlbum;
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    async update(id: string, item: Album) {
        try {
            const newAlbum = item;
            const repArtist = this._service.artist;
            const artistId = newAlbum.artistId;

            if (artistId === undefined) {
                throw new BadRequestException('artistId should not be empty');
            }

            if (artistId != null) {
                if (!validate(artistId)) {
                    throw new BadRequestException('artistId is not uuid');
                }

                await repArtist.get(artistId);        
            }

            newAlbum.id = id;
            const updatedAlbum = await this.prisma.album.update({
                where: {
                    id: id,
                },
                data: {
                    name: newAlbum.name,
                    year: newAlbum.year,
                    artistId: newAlbum.artistId,
                }
            })

            return updatedAlbum;
        } catch (err) {
            throw new NotFoundException(err);
        }        
    } 

    delete (id: string) {
        return new Promise ((resolve, reject) => {
            this.prisma.album.delete({
                where: {
                    id: id,
                }
            }) 
            .then((album) => {

                let promises = [];

                promises.push(this._service.track.deleteLinkToAlbum(id));

                promises.push(this._service.favorites.deleteAlbum(id))

                const result = Promise.all(promises);

                resolve(result);

            })
            .catch((err) => {
                reject( new NotFoundException('Album was not found'))
            }) 
    
        })
    }

    async deleteLinkToArtist(id: string) {
        try {
            const result = await this.prisma.album.updateMany({
                where: {
                    artistId: id,
                },
                data: {
                    artistId: null,
                }
            })

            return result;
        } catch (error) {
            
        }
    }
    
}