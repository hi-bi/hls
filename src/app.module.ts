import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AlbumController, ArtistController, TrackController, UserController} from './controllers'
import { DataServicesModule } from './services/data-services/data-services.module';
import { AlbumUseCasesModule } from './use-cases/album/album-use-cases.module';
import { ArtistUseCasesModule } from './use-cases/artist/artist-use-cases.module';
import { TrackUseCasesModule } from './use-cases/track/track-use-cases.module';
import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';

import { AppService } from './app.service';

@Module({
  imports: [
    DataServicesModule,
    AlbumUseCasesModule,
    ArtistUseCasesModule,
    TrackUseCasesModule,
    UserUseCasesModule
  ],
  controllers: [AppController, AlbumController, ArtistController, TrackController,UserController],
  providers: [AppService],
})
export class AppModule {}
