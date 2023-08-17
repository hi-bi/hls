import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AlbumController, ArtistController, TrackController, UserController, FavoritesController} from './controllers'
import { DataServicesModule } from './services/data-services/data-services.module';
import { AlbumUseCasesModule } from './use-cases/album/album-use-cases.module';
import { ArtistUseCasesModule } from './use-cases/artist/artist-use-cases.module';
import { TrackUseCasesModule } from './use-cases/track/track-use-cases.module';
import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';
import { FavoritesUseCasesModule } from './use-cases/favorites/favorites-use-case.module';
import { LoggingInterceptorModule } from './interceptors/logging-interceptors.module';
import {EventEmitterModule } from '@nestjs/event-emitter'

import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NotificationsModule } from './notifications/notifications.module';
import { NotificationsService } from './notifications/notifications.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DataServicesModule,
    AlbumUseCasesModule,
    ArtistUseCasesModule,
    TrackUseCasesModule,
    UserUseCasesModule,
    FavoritesUseCasesModule,
    LoggingInterceptorModule,
    EventEmitterModule.forRoot(),
    NotificationsModule,
    ],
  controllers: [
    AppController, 
    AlbumController,  
    ArtistController, 
    TrackController,
    UserController, 
    FavoritesController
  ],
  providers: [
    AppService,
    NotificationsService,
  ],
})
export class AppModule {}
