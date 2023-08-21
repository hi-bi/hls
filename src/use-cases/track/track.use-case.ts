import { Injectable } from '@nestjs/common';
//import { Track } from '../../core/entities';
//import { IDataServices } from '../../core/abstracts';
import { PrismaDataServices } from 'src/frameworks/data-services/prisma/prisma-data-services.service';
import { CreateTrackDto, UpdateTrackDto } from '../../core/dtos';
import { TrackFactoryService } from './track-factory.service';
import { Track } from '@prisma/client';

@Injectable()
export class TrackUseCases {
  constructor(
    private dataServices: PrismaDataServices,
    private trackFactoryService: TrackFactoryService,
  ) {}

  getAllTracks(): Promise<Track[]> {
    return new Promise ((resolve, reject) => {
      resolve( this.dataServices.track.getAll()); 
    })
  }

  getTrackById(id: string): Promise<Track> {
    return new Promise ((resolve, reject) => {
      resolve(this.dataServices.track.get(id)); 
    })
  }

  createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    return new Promise ((resolve, reject) => {
      const track = this.trackFactoryService.createNewTrack(createTrackDto);
      resolve( this.dataServices.track.create(track));
    })
  }

  updateTrack(
    trackId: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    return new Promise ((resolve, reject) => {
      const track = this.trackFactoryService.updateTrack(updateTrackDto);
      resolve( this.dataServices.track.update(trackId, track));
    })
  }

  deleteTrack(
    trackId: string,
  ): Promise<unknown> {
    return new Promise ((resolve, reject) => {
      resolve( this.dataServices.track.delete(trackId));
    })
  }

}