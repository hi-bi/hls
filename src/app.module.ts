import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController, AlbumController, ArtistController, TrackController, UserController, FavoritesController} from './controllers'
import { DataServicesModule } from './services/data-services/data-services.module';
import { AlbumUseCasesModule } from './use-cases/album/album-use-cases.module';
import { ArtistUseCasesModule } from './use-cases/artist/artist-use-cases.module';
import { TrackUseCasesModule } from './use-cases/track/track-use-cases.module';
import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';
import { FavoritesUseCasesModule } from './use-cases/favorites/favorites-use-case.module';
import { LoggingInterceptorModule } from './interceptors/logging-interceptors.module';
//import {EventEmitterModule } from '@nestjs/event-emitter'
import { LoggerServiceModule } from './services/logging-services/logging-services.module';
import { LoggerMiddleware } from './services/middleware/middleware-logger.service';

import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NotificationsModule } from './notifications/notifications.module';
import { NotificationsService } from './notifications/notifications.service';
import { ExceptionsModule } from './exceptions/exception-everything.module';
import { AuthModule } from './services/auth/auth-services.module';

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
    //EventEmitterModule.forRoot(),
    NotificationsModule,
    ExceptionsModule,
    LoggerServiceModule,
    AuthModule,
    ],
  controllers: [
    AppController,
    AuthController, 
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
