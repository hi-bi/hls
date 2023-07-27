import { Album, Artist, Favorites, Track, User} from '../entities';
import { IGenericRepository,IGenericFavoritesRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract album: IGenericRepository<Album>;

  abstract artist: IGenericRepository<Artist>;

  abstract track: IGenericRepository<Track>;

  abstract user: IGenericRepository<User>;

  abstract favorites: IGenericFavoritesRepository<Favorites>;

}