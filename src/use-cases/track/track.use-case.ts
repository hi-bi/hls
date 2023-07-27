import { Injectable } from '@nestjs/common';
import { Track } from '../../core/entities';
import { IDataServices } from '../../core/abstracts';
import { CreateTrackDto, UpdateTrackDto } from '../../core/dtos';
import { TrackFactoryService } from './track-factory.service';

@Injectable()
export class TrackUseCases {
  constructor(
    private dataServices: IDataServices,
    private trackFactoryService: TrackFactoryService,
  ) {}

  getAllTracks(): Promise<Track[]> {
    return this.dataServices.track.getAll();
  }

  getTrackById(id: any): Promise<Track> {
    return this.dataServices.track.get(id);
  }

  createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    const album = this.trackFactoryService.createNewTrack(createTrackDto);
    return this.dataServices.track.create(album);
  }

  updateAlbum(
    trackId: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const track = this.trackFactoryService.updateTrack(updateTrackDto);
    return this.dataServices.track.update(trackId, track);
  }
}