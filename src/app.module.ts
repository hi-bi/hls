import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AlbumController, ArtistController, TrackController, UserController} from './controllers'
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, AlbumController, ArtistController, TrackController,UserController],
  providers: [AppService],
})
export class AppModule {}
