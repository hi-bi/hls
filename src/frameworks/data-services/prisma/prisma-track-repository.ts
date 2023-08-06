import { PrismaDataServices } from './prisma-data-services.service';
import { PrismaService } from './prisma-client.service';
import { Track } from '@prisma/client' 
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { v4, validate } from 'uuid';

export class PrismaTrackRepository {
    
    public _service: PrismaDataServices;

    constructor(private prisma: PrismaService) {}
    
    getAll(): Promise<Track[]> {

        return new Promise ((resolve, reject) => {
            this.prisma.track.findMany()
            .then((res) => {
                resolve(res);
            })
        })
    }

    get(id: string): Promise<Track> {
        return new Promise ((resolve, reject) => {
            this.prisma.track.findUnique({
                where: {
                    id: id,
                }
            })
            .then((track) => {
                if (track != null) {
                    resolve(track);
                } else {
                    reject(new NotFoundException('Track was not found'));
                }
            })
        })
    }

    async create(track: Track) {

        try {
            const artistId = track.artistId;
            const albumId = track.albumId;
    
            let okArtistId = false;
    
            if (artistId === undefined) {
            } else {
                if (artistId != null) {
                    if (validate(artistId)) {
                        okArtistId = true
                    }
                } else {
                    okArtistId = true
                }
            }
    
            if (!okArtistId) {
                throw new BadRequestException('artistId is wrong')
            }
    
            let okAlbumId = false;
    
            if (albumId === undefined) {
            } else {
                if (albumId != null) {
                    if (validate(albumId)) {
                        okAlbumId = true
                    }
                } else {
                    okAlbumId = true
                }
            }
    
            if (!okAlbumId) {
                throw new BadRequestException('albumId is wrong')
            }
    
            const repArtist = this._service.artist;
            const repAlbum = this._service.album;
        
            if (artistId != null) {
                await repArtist.get(artistId);
            }
    
            if (albumId != null) {
                await repAlbum.get(albumId)
            }
    
            track.id = v4();
            const createdTrack = await this.prisma.track.create({
                data: {
                    id: track.id,
                    name: track.name,
                    artistId: track.artistId,
                    albumId: track.albumId,
                    duration: track.duration,
                }
            })
    
            return createdTrack;
        } catch (error) {
            throw new BadRequestException(error);            
        }
    }


    async update(id: string, track: Track) {

        try {

            const oldTrack = await this.get(id);

            const artistId = oldTrack.artistId;
            const albumId = oldTrack.albumId;
    
            let okArtistId = false;
    
            if (artistId === undefined) {
            } else {
                if (artistId != null) {
                    if (validate(artistId)) {
                        okArtistId = true
                    }
                } else {
                    okArtistId = true
                }
            }
    
            if (!okArtistId) {
                throw new BadRequestException('artistId is wrong')
            }
    
            let okAlbumId = false;
    
            if (albumId === undefined) {
            } else {
                if (albumId != null) {
                    if (validate(albumId)) {
                        okAlbumId = true
                    }
                } else {
                    okAlbumId = true
                }
            }
    
            if (!okAlbumId) {
                throw new BadRequestException('albumId is wrong')
            }
    
            const repArtist = this._service.artist;
            const repAlbum = this._service.album;
        
            if (artistId != null) {
                await repArtist.get(artistId);
            }
    
            if (albumId != null) {
                await repAlbum.get(albumId)
            }

            track.id = id;
            const updatedTrack = await this.prisma.track.update({
                where: {
                    id: id,
                },
                data: {
                    id: track.id,
                    name: track.name,
                    artistId: track.artistId,
                    albumId: track.albumId,
                    duration: track.duration,
                }
            })

            return updatedTrack;
        } catch (error) {
            throw new NotFoundException(error);            
        }
    }

    delete(id: string) {
        return new Promise ((resolve, reject) => {

            this.prisma.track.delete({
                where: {
                    id: id,
                },
            })
            .then((track) => {

                this._service.favorites.deleteTrack(id)
                .then( (track) => {
//                    console.log('delete track from favorites: ', id, track)
                    resolve(true);
                })
                .catch( (error) => {
//                    console.log('not found track in favorites: ', id, error)
                    resolve(false);
                })

            })
            .catch(() => {
                reject( new NotFoundException('Track was not found'));
            })

            //const res = this._repository.delete(id);
    
        })
    }

    deleteLinkToArtist(id: string): Promise<any> {
        return new Promise ((resolve, reject) => {
            this.prisma.track.updateMany({
                where: {
                    artistId: id,
                },
                data: {
                    artistId: null,
                }
            })
            .then((track) => {
                resolve(true);
            })
            .catch((err) => {
                resolve(false);
            })
//            console.log('Track delete author link: ', id)
        })
    }

    deleteLinkToAlbum(id: string): Promise<any> {
        return new Promise ((resolve, reject) => {
            this.prisma.track.updateMany({
                where: {
                    albumId: id,
                },
                data: {
                    albumId: null,
                }
            })
            .then((track)=> {
                resolve(true);
            })
            .catch((err) => {
                resolve(false);
            })
//            console.log('Track delete album link: ', id)
        })
    }
}