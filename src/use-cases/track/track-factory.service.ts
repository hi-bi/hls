import { Injectable } from '@nestjs/common';
import { Track } from '../../core/entities';
import { CreateTrackDto, UpdateTrackDto } from '../../core/dtos';

@Injectable()
export class TrackFactoryService {
  createNewTrack(createTrackDto: CreateTrackDto) {
    const newTrack = new Track();
    newTrack.name = createTrackDto.name;
    newTrack.artistId = createTrackDto.artistId;
    newTrack.albumId = createTrackDto.albumId;
    newTrack.duration = createTrackDto.duration

    return newTrack;
  }

  updateTrack(updateTrackDto: UpdateTrackDto) {
    const newTrack = new Track();
    newTrack.name = updateTrackDto.name;
    newTrack.artistId = updateTrackDto.artistId;
    newTrack.albumId = updateTrackDto.albumId;
    newTrack.duration = updateTrackDto.duration

    return newTrack;
  }
}