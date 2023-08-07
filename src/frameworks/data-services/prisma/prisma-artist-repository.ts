import { PrismaDataServices } from './prisma-data-services.service';
import { PrismaService } from './prisma-client.service';
import { Artist } from '@prisma/client' 
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class PrismaArtistRepository {
    
    public _service: PrismaDataServices; 

    constructor(private prisma: PrismaService) {};
    
    async getAll() {
        try {
            const artits = await this.prisma.artist.findMany();
            
            return artits;
        } catch (err) {

        }
    }

    async get(id: string) {
        try {
            const artist = await this.prisma.artist.findUnique({
                where: {
                    id: id,
                }
            })
            if (artist == null) {
                throw new NotFoundException('Artist was not found');
            }

            return artist;

        } catch (error) {
            throw new NotFoundException('Artist was not found');
        }
    }

    async create(artist: Artist) {
        try {
            const artistId = v4();

            const newArtist =  await this.prisma.artist.create( {
                data: {
                    id: artistId,
                    name: artist.name,
                    grammy: artist.grammy
                } 
            })
            return newArtist;
            
        } catch (err) {
            throw new UnprocessableEntityException(err)
        }
    }

    async update(id: string, artist: Artist) {
        try {

            const updatedArtist = await this.prisma.artist.update({
                where: {
                    id: id,
                },
                data: {
                    name: artist.name,
                    grammy: artist.grammy
                }
            }) 

            return updatedArtist;

        } catch (error) {
            throw new NotFoundException('Artist with id does not exist')
        }
    }

    async delete(id: string) {

        try {

            const deletedArtist = await this.prisma.artist.delete({
                where: {
                    id: id,
                }
            }) 
            
            await this._service.album.deleteLinkToArtist(id);

            await this._service.track.deleteLinkToArtist(id);

            await this._service.favorites.deleteArtist(id);

            return

        } catch (err) {
            throw new NotFoundException('Artist was not found');
        }
    }

    deletePromise(id: string) {
        return new Promise ((resolve, reject) => {
            this.prisma.artist.delete({
                where: {
                    id: id,
                }
            }) 
            .then((artist) => {

                let promises = [];

                promises.push(this._service.album.deleteLinkToArtist(id));

                promises.push(this._service.track.deleteLinkToArtist(id));

                promises.push(this._service.favorites.deleteArtist(id))

                const result = Promise.all(promises);

                resolve(result);

            })
            .catch((err) => {
                reject( new NotFoundException('Artist was not found'))
            }) 
    
        })
    };
    
}